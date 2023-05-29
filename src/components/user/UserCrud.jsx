import React, { Component } from "react";
import axios from 'axios'
import Main from "../template/Main";

const headerProps = {
    icon: 'address-card-o',
    title: 'Cadastro',
    subtitle: 'Cadastrar comércios do ramo alimentício.'
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

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ restaurantes: initialState.restaurantes })
    }

    save() {
        const restaurantes = this.state.restaurantes
        const method = restaurantes.id ? 'put' : 'post'
        const url = restaurantes.id ? `${baseUrl}/${restaurantes.id}` : baseUrl
        axios[method](url, restaurantes)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ restaurantes: initialState.restaurantes, list })
            })
    }

    getUpdatedList(restaurantes, add = true) {
        const list = this.state.list.filter(r => r.id !== restaurantes.id)
        if (add) list.unshift(restaurantes)
        return list
    }

    updateField(event) {
        const restaurantes = { ...this.state.restaurantes }
        restaurantes[event.target.name] = event.target.value
        this.setState({ restaurantes })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row  mb-5">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do Estabelecimento: </label>
                            <input type="text" className='form-control'
                                name="nome"
                                value={this.state.restaurantes.nome}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o nome do estabelecimento..' />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do Proprietário:</label>
                            <input type="text" className='form-control'
                                name="proprietario"
                                value={this.state.restaurantes.proprietario}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o nome do propretário do estabelecimento..' />
                        </div>
                    </div>
                </div>
                <div className="row   mb-5">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Tipo: </label>
                            <input type="text" className='form-control'
                                name="tipo"
                                value={this.state.restaurantes.tipo}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o tipo de estabelecimento..' />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Contato: </label>
                            <input type="tel" className='form-control'
                                name="contato"
                                value={this.state.restaurantes.contato}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o contato..' />
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Horário de funcionamento:</label>
                            <textarea className="form-control"
                                name="descricaoHorario"
                                value={this.state.restaurantes.descricaoHorario}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite aqui o horário em que o estabelecimento funiona..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary espaco"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(restaurantes) {
        this.setState({ restaurantes })
    }

    remove(restaurantes) {
        axios.delete(`${baseUrl}/${restaurantes.id}`).then(resp => {
            const list = this.getUpdatedList(restaurantes, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-2">
                <thead>
                    <tr>
                        <th>Restaurante</th>
                        <th>Contato</th>
                        <th>Ações</th>
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
                    <td>{restaurantes.contato}</td>
                    <td>
                        <button className="btn btn-light"
                            onClick={() => this.load(restaurantes)} >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger espaco"
                            onClick={() => this.remove(restaurantes)} >
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                <div>
                    <hr />
                    <h2 >Restaurantes cadastrados!</h2>
                </div>
                {this.renderTable()}
            </Main>
        )
    }
}