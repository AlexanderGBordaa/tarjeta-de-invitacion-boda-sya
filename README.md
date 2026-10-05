# Invitación de Boda Digital — Sofia & Alexander (S&A) 💍

Una tarjeta de invitación web interactiva, moderna y de alta gama creada para celulares y computadoras con animación 3D de apertura de sobre con sello de lacre, música romántica, cuenta regresiva, fotos de la pareja, ubicación en Google Maps, confirmación directa por WhatsApp y un panel privado exclusivo para los novios.

---

## 🔗 Enlaces del Proyecto en Vercel

- **Invitación Pública (para compartir a los invitados)**:
  👉 **`https://tarjeta-de-invitacion-boda-sya.vercel.app/`**
- **Panel Privado de Novios (exclusivo para Sofia & Alexander)**:
  👉 **`https://tarjeta-de-invitacion-boda-sya.vercel.app/invitados.html`**

*(En local: `http://localhost:8080/` e `http://localhost:8080/invitados.html`)*

---

## 📱 WhatsApp de Recepción

- Todas las confirmaciones de asistencia y los comprobantes de pago de la tarjeta se dirigen automáticamente a Alexander al número:
  **`3454048992`** (`+54 9 3454048992`)
- Los comprobantes de regalos para la boda se dirigen directamente a Fran al número:
  **`3442668727`** (`+54 9 3442 668727`)

---

## 👑 Características del Panel Privado (`invitados.html`)

1. **Visibilidad Exclusiva**: La tabla no se muestra a los invitados en la tarjeta pública; solo la ven los novios en este enlace privado.
2. **Métricas en tiempo real (KPIs)**:
   - Total de Adultos confirmados
   - Total de Niños estimados
   - Cantidad total de respuestas
   - Respuestas de quienes no podrán asistir
3. **Buscador en vivo**: Filtra al instante por nombre, alergia o dieta especial.
4. **Descargar Excel (.csv)**: Exporta toda la lista lista para abrir en Microsoft Excel o Google Sheets.
5. **Carga Manual de Invitados**: Botón para que los novios puedan registrar a cualquier invitado que les haya confirmado por llamada, mensaje o en persona.
6. **Eliminar registros**: Botón para descartar pruebas o modificaciones.

---

## 📂 Estructura de Archivos

```
Tarjeta de Invitacion Boda/
├── index.html            # Invitación pública con apertura de sobre, info y RSVP
├── invitados.html        # Panel privado exclusivo para los novios con la lista de confirmados
├── css/
│   └── styles.css        # Estilos visuales de lujo, animaciones 3D y diseño adaptable
├── js/
│   └── app.js            # Lógica interactiva, audio, sincronización y envío a WhatsApp
└── assets/
    └── images/
        ├── hero.jpg      # Foto principal de portada (Anillo, flores amarillas y sonrisas)
        ├── couple-1.jpg  # Foto 1 (La propuesta frente al lago)
        ├── couple-2.jpg  # Foto 2 (Compromiso en el puente de madera)
        ├── couple-3.png  # Foto 3 (Ramo de flores amarillas y anillo)
        ├── couple-4.jpg  # Foto 4 (Recostados junto al lago mirando al cielo)
        └── couple-5.jpg  # Foto 5 (Manos entrelazadas y anillo sobre el pecho)
```
