import React from "react";

export const Footer = () => {

	return (
		<footer>
			<div className="footer-body">
				<div>
					<h3 className="title-footer fs-5">ÚNETE A NUESTRO DISCORD</h3>
					<p className="p-footer">Ven al servidor oficial de GG-Hunter y chatea con otros usuarios.</p>
					<button className="icon-discord" onClick={() => window.location.href = 'https://discord.com/channels/1281719709527572592/1281719709527572594'}>
						<i className="fa-brands fa-discord"></i>
					</button>
				</div>
				<div>
					<h3 className="title-footer fs-5">SÍGUENOS</h3>
					<p className="p-footer">¡Mantente conectado y sigue nuestra páginas oficial para más noticias!</p>
					<button className="icon-social" onClick={() => window.location.href = 'https://www.facebook.com/profile.php?id=61565137364035'}>
						<i className="fab fa-facebook-f"></i>
					</button>
					<button className="icon-social" onClick={() => window.location.href = 'https://x.com/home'}><i className="fab fa-twitter"></i></button>
					<button className="icon-social" onClick={() => window.location.href = 'https://www.instagram.com/_gg_hunter_/'}><i className="fab fa-instagram"></i></button>
				</div>
				<div>
					<h3 className="title-footer fs-4">GG-Hunter</h3>
					<p className="p-footer">Compara los precios de tu juegos favoritos para encontrar el mejor precio. ¡Únete a nuestra comunidad!</p>
					<p className="p-footer">&copy; 2024 GG-Hunter. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>

	);
}

