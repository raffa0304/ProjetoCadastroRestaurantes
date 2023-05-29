import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/cadastro">
                <i className="fa fa-address-card-o"></i> Cadastro
            </Link>
            <Link to="/restaurantes">
                <i className="fa fa-cutlery"></i> Comércios
            </Link>
        </nav>
    </aside>