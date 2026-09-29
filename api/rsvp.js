// api/rsvp.js - Vercel Serverless Function
// Sincronización en tiempo real de confirmaciones de boda

const CLOUD_DB = 'https://extendsclass.com/api/json-storage/bin/caceecb';

module.exports = async function handler(req, res) {
  // Habilitar CORS para permitir llamadas tanto desde el dominio principal como previews
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Obtener lista completa de invitados confirmados
  if (req.method === 'GET') {
    try {
      const response = await fetch(CLOUD_DB, { cache: 'no-store' });
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Error al consultar almacenamiento' });
      }
      const data = await response.json();
      const guests = Array.isArray(data.guests) ? data.guests : [];
      return res.status(200).json({ guests });
    } catch (err) {
      console.error('Error en GET /api/rsvp:', err);
      return res.status(500).json({ error: err.message, guests: [] });
    }
  }

  // POST: Registrar un nuevo invitado
  if (req.method === 'POST') {
    try {
      let newGuest = req.body;
      if (typeof newGuest === 'string') {
        try {
          newGuest = JSON.parse(newGuest);
        } catch (e) {
          // Ya es objeto o formato directo
        }
      }

      if (!newGuest || !newGuest.name) {
        return res.status(400).json({ error: 'Faltan datos del invitado (nombre requerido)' });
      }

      // Obtener lista actual de la nube
      const getRes = await fetch(CLOUD_DB, { cache: 'no-store' });
      let currentGuests = [];
      if (getRes.ok) {
        const currentData = await getRes.json();
        currentGuests = Array.isArray(currentData.guests) ? currentData.guests : [];
      }

      // Evitar duplicados idénticos en menos de 10 segundos
      const isDuplicate = currentGuests.some(
        g => g.name.toLowerCase() === newGuest.name.toLowerCase() && g.date === newGuest.date
      );
      if (!isDuplicate) {
        currentGuests.unshift(newGuest);
      }

      // Guardar lista actualizada en la nube
      const putRes = await fetch(CLOUD_DB, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guests: currentGuests })
      });

      if (!putRes.ok) {
        return res.status(500).json({ error: 'Error al persistir en la nube' });
      }

      return res.status(200).json({ success: true, count: currentGuests.length, guests: currentGuests });
    } catch (err) {
      console.error('Error en POST /api/rsvp:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  // PUT: Reemplazar lista completa (para eliminar o editar desde panel de novios)
  if (req.method === 'PUT') {
    try {
      let bodyData = req.body;
      if (typeof bodyData === 'string') {
        bodyData = JSON.parse(bodyData);
      }

      const updatedGuests = Array.isArray(bodyData.guests) ? bodyData.guests : [];

      const putRes = await fetch(CLOUD_DB, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guests: updatedGuests })
      });

      if (!putRes.ok) {
        return res.status(500).json({ error: 'Error al actualizar en la nube' });
      }

      return res.status(200).json({ success: true, count: updatedGuests.length, guests: updatedGuests });
    } catch (err) {
      console.error('Error en PUT /api/rsvp:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
