# Growth-Test
# Charchazos y Abrazos

### Descripción
**Charchazos y Abrazos** es una aplicación que permite a los usuarios solicitar servicios físicos de "Charchazos" o "Abrazos" a través de proveedores. Esta plataforma ofrece la posibilidad de expresar afecto o enojo sin tener que estar físicamente presente. ¡Deja que nuestros proveedores hagan el trabajo por ti!

### Funcionalidades Principales
- **Inicio de Sesión Dual**: La aplicación cuenta con dos tipos de usuarios, el solicitante (cliente) y el proveedor.
- **Interfaz de Solicitud**:
  - Los solicitantes pueden hacer pedidos de servicios, seleccionando entre un "Charchazo" o un "Abrazo".
  - Los solicitantes pueden ver el historial de sus solicitudes pasadas y sus estados actuales.
  - La plataforma muestra un contador que indica cuántos pedidos faltan para que el próximo sea gratuito (cada quinto pedido es gratis).
  - Los solicitantes tienen la opción de evaluar el servicio prestado.
- **Interfaz de Proveedor**:
  - Los proveedores pueden ver una lista de servicios pendientes, aceptar o rechazar solicitudes y marcar el servicio como completado.
  - Los proveedores también pueden incluir una breve descripción del evento, que luego será visible para el solicitante.
  - La plataforma calcula y muestra las ganancias acumuladas por el proveedor según los servicios completados.

### Instrucciones de Configuración
Para ejecutar el proyecto localmente, sigue los pasos de configuración detallados en el `README` principal del proyecto charchazos-abrazos.

### Dependencias
- [React](https://reactjs.org/) - Biblioteca de JavaScript para construir interfaces de usuario.
- [React Router](https://reactrouter.com/) - Librería de enrutamiento para aplicaciones de React.
  
### Ejemplo de Uso
1. Un solicitante inicia sesión y hace una solicitud de un servicio.
2. Un proveedor acepta el servicio y completa el pedido, dejando una descripción si lo desea.
3. El solicitante evalúa el servicio en base a su satisfacción y a los comentarios del proveedor.

### Estructura del Proyecto
El proyecto cuenta con los siguientes componentes clave:
- **Home**: Página de inicio que permite seleccionar el tipo de usuario (Solicitante o Proveedor).
- **SolicitorDashboard**: Interfaz para los solicitantes donde pueden hacer pedidos y ver el historial.
- **ProviderDashboard**: Interfaz para los proveedores donde pueden gestionar pedidos y añadir descripciones.

---

¡Esperamos que disfrutes usando **Charchazos y Abrazos**!
