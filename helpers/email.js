import nodemailer from 'nodemailer';

export const emailRegistro = async datos => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Informacion del Emial
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Confirma tu cuenta',
    text: 'Compureba tu cuenta en UpTask',
    html: `<p>Hola ${nombre} Comprueba tu cuenta en UpTask</p>
    <p>Tu Cuenta ya esta casi lista, solo debes comprobar en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`,
  });
};

export const emailOlvidePassword = async datos => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Informacion del Emial
  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Reestablece tu contraseña',
    text: 'Reestablece tu Contraseña',
    html: `<p>Hola ${nombre} has solicitado reestablecer tu contraseña</p>
    <p>Sigue el siguiente enlace para generar una nueva contraseña: <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer contraseña</a></p>
    <p>Si tu no solicistaste este email, puedes ignorar el mensaje</p>`,
  });
};
