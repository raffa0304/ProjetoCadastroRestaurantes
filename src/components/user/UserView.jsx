import React, { Component } from "react";
import axios from 'axios'
import Main from "../template/Main";

const headerProps = {
    icon: 'cutlery',
    title: 'Comércios',
    subtitle: 'Detalhes dos comércios cadastrados.'
}

const baseUrl = 'http://localhost:3001/restaurantes'
const initialState = {
    restaurantes: {
        nome: '',
        proprietario: '',
        tipo: '',
        contato: '',
        descricaoHorario: ''
    },
    list: []
}

export default class UserView extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    renderTable() {
        return (
            <table className="table mt-2">
                <thead>
                    <tr>
                        <th>Restaurante</th>
                        <th>Proprietário</th>
                        <th>Contato</th>
                        <th>tipo</th>
                        <th>horário de funcionamento</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(restaurantes => {
            return (
                <tr key={restaurantes.id}>
                    <td>{restaurantes.nome}</td>
                    <td>{restaurantes.proprietario}</td>
                    <td>{restaurantes.contato}</td>
                    <td>{restaurantes.tipo}</td>
                    <td>{restaurantes.descricaoHorario}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderTable()}
            </Main>
        )
    }

}