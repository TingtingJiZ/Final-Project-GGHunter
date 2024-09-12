import React from "react";

export const Footer = () => {

	return (
		<footer>
			<div className="footer-body">
				<div>
					<h3 className="title-footer fs-5">ÚNETE A NUESTRO DISCORD</h3>
					<p className="p-footer">Ven al servidor oficial de GG-Hunter y chatea con otros usuarios.</p>
					<a href="https://discord.gg/G3vKZ7DJXk" className="icon-discord" target="_blank">
						<i className="fa-brands fa-discord text-black"></i>
					</a>
				</div>
				<div>
					<h3 className="title-footer fs-5">SÍGUENOS</h3>
					<p className="p-footer">¡Mantente conectado y sigue nuestra páginas oficial para más noticias!</p>
					<a className="icon-social" href='https://www.facebook.com/profile.php?id=61565137364035' target="_blank">
						<i className="fab fa-facebook-f"></i>
					</a>
					<a className="icon-social" href='https://x.com/home' target="_blank">
						<i className="fab fa-twitter"></i>
						</a>
					<a className="icon-social" href= 'https://www.instagram.com/_gg_hunter_/' target="_blank">
					<i className="fab fa-instagram"></i></a>
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

