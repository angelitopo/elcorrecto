Proyecto de Web App para Restaurante

Este proyecto es una aplicación web diseñada para un restaurante que permite a los clientes ver el menú, realizar pedidos y procesar pagos a través de la integración con la API de SumUp. Además, el sistema está diseñado para conectarse con un sistema de punto de venta (POS) para imprimir los pedidos, incluyendo el número de mesa y los detalles del pedido.

Tecnologías Utilizadas

Frontend: React.js, HTML, CSS, JavaScript

Backend: Node.js, Express.js

Base de Datos: MongoDB

API de Pago: SumUp

Hosting:

Frontend: GoDaddy Web Hosting Deluxe

Backend: VPS con Linux (Hostinger Cloud Startup)


Características

Navegación del Menú: Los usuarios pueden navegar y filtrar el menú del restaurante, que incluye diferentes categorías de platos y bebidas.

Selección de Mesa: Los clientes pueden ingresar el número de mesa para identificar su pedido.

Carrito de Compras: Los clientes pueden añadir productos al carrito y ver el total de su pedido.

Procesamiento de Pagos: El backend se conecta a la API de SumUp para procesar los pagos de manera segura.

Impresión de Pedidos: Integración con el sistema POS para imprimir los detalles del pedido junto con el número de mesa.

Instalación y Configuración

Requisitos Previos

Node.js y npm instalados en el servidor.

Acceso a cPanel o SSH para la configuración del VPS.

Cuenta en SumUp para acceder a la API y un token de autenticación.

Hosting para frontend y backend (detallado anteriormente).

Instrucciones de Instalación



Instalar Dependencias

Para el backend:

cd backend
npm install

Para el frontend:

cd frontend
npm install

Configuración del Backend

Crear un archivo .env en la carpeta del backend con las siguientes variables de entorno:

PORT=5000
MONGO_URI=tu_mongo_uri
SUMUP_API_KEY=tu_sumup_api_key
SUMUP_MERCHANT_EMAIL=tu_email_de_sumup

Iniciar el servidor:

npm start

Configuración del Frontend

Crear un archivo .env en la carpeta del frontend con la URL del backend:

REACT_APP_API_URL=http://tu_dominio.com/api

Iniciar la aplicación:

npm start

Despliegue

Frontend: Subir los archivos compilados (build) a tu hosting de GoDaddy mediante cPanel o FTP.

Backend: Desplegar en el VPS con Node.js en Hostinger. Se recomienda usar PM2 para mantener el servidor en ejecución.



Uso

Navegación del Menú: Al ingresar, el cliente debe seleccionar su número de mesa y luego navegar por el menú para seleccionar sus platos y bebidas.

Carrito y Pago: Después de seleccionar los productos, el cliente puede ir al carrito y hacer clic en "Pagar ahora" para ser redirigido a la página de pago de SumUp.

Procesamiento del Pedido: Una vez procesado el pago, el backend envía el pedido al sistema POS para ser impreso.

Integración con la API de SumUp

Para procesar los pagos se utiliza la API de SumUp, que permite crear una "checkout session" y luego procesar el pago de manera segura. Se utiliza la URL https://api.sumup.com/v0.1/checkouts para crear una nueva transacción y se configura el checkoutId que será utilizado en la página de pago.

Ejemplo de Código de Pago

const handlePayment = async () => {
  try {
    const orderResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/orders`,
      {
        tableNumber,
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price, 0),
      }
    );

    const checkoutResponse = await axios.post(
      'https://api.sumup.com/v0.1/checkouts',
      {
        checkout_reference: `order_${orderResponse.data._id}`,
        amount: orderResponse.data.total,
        currency: 'GBP',
        pay_to_email: process.env.SUMUP_MERCHANT_EMAIL,
        description: 'Restaurant order payment',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SUMUP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    window.location.href = checkoutResponse.data.checkout_url;
  } catch (error) {
    console.error('Payment failed', error);
  }
};

Consideraciones de Seguridad

Utiliza HTTPS para todas las comunicaciones entre el cliente y el servidor.

Almacena las credenciales y las claves API de forma segura en archivos .env.

Configura copias de seguridad diarias para evitar pérdida de datos
