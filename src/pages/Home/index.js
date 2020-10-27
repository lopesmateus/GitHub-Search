import React, { Component } from 'react';
import api from '../../service/api';
import OrganizationCard from '../../components/organizationCard';
import LogoBusca from '../../img/LogoBusca.png'
import Search from '../../img/Search.svg';
import './index.css';

export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            organization: "",
            organizationList: [],
            error: { hasError: false, message: '' },
        }
    }

    handleSubmit= async (event) =>{
        event.preventDefault();
        try {
            const response = await api.get(`/orgs/${this.state.organization}`);
            this.setState({ organizationList: [...this.state.organizationList, response.data]})
        } catch (err) {
            this.setState(
                { 
                    error: 
                    { 
                        hasError: true, 
                        message: 'Organização não encontrada'
                    } 
                })
        }

    }

    componentDidUpdate() {
        const { organization, error } = this.state;
        if (organization === '' && error.hasError) {
            this.setState({ error: { hasError: false, message: '' } })
        }
    }

    render() {
        return(
            <div className="App">
                <div className="containerSearch">
                    <img src={LogoBusca} alt="logo" />
                    <form onSubmit={this.handleSubmit}>
                        <div className={this.state.error.hasError ? "inputWrapperError" : "inputWrapper"}>
                            <img src={Search} alt="search icon" />
                            <input 
                                name="organization" 
                                placeholder="Buscar organização" 
                                value={this.organization} 
                                onChange={(event) => this.setState({ organization:event.target.value})} 
                                type="text" 
                                required 
                            />
                        </div>
                    </form>
                    {this.state.error.message && (<h2>{this.state.error.message}</h2>)}
                </div>

                <div className="organizationWrapper">
                    {this.state.organizationList.map(org => (
                        <OrganizationCard isSimple={true} org={org} key={org.id}/>
                    ))}
                </div>
            </div>
        )
    }
}