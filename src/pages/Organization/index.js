import React, { Component } from 'react';
import api from '../../service/api';
import OrganizationCard from '../../components/organizationCard';
import Search from '../../img/Search.svg';
import star from '../../img/star.png';
import forks from '../../img/forks.png';
import scale from '../../img/scale.png';
import circle from '../../img/circle-solid.svg';
import closeButton from '../../img/x.png';
import './index.css';

export default class Organization extends Component {
    constructor(props){
        super(props);

        this.state = {
            organizationinfo: {},
            repositories: [],
            repository: '',
            error: { hasError: false, message: '' },
            canCleanSearch: false,
        }

    };


    async componentDidMount() {
        const organizationName = this.props.match.params.organizationName;
        const [organization, repositories] = await Promise.all([
            api.get(`orgs/${organizationName}`),
            api.get(`orgs/${organizationName}/repos`),
        ]);
        this.setState({ 
            organizationinfo: organization.data, 
            repositories: repositories.data,
            
        })
    }

    componentDidUpdate() {
        const { repository, error } = this.state;
        if (repository === '' && error.hasError) {
            this.setState({ error: { hasError: false, message: '' } })
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const organizationName = this.props.match.params.organizationName;
        try {
            const repositoryData = await api.get(
                `/repos/${organizationName}/${this.state.repository}`
            );
            
            this.setState({ repositories: [repositoryData.data], canCleanSearch: true })
        } catch (err) {
            this.setState(
                { 
                    error: 
                    { 
                        hasError: true, 
                        message: 'Repositório não encontrado'
                    } 
                })
        }
        
    }

    onReset = async () => {
        const organizationName = this.props.match.params.organizationName;
        try{
            const repositories = await api.get(`orgs/${organizationName}/repos`)
            this.setState({ 
                repositories: repositories.data, 
                canCleanSearch:  false,
                repository: '' 
            })
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        return(
            <div>
                <OrganizationCard isSimple={false} org={this.state.organizationinfo}/>

                <div className="containerSearchRepos">
                    <form onSubmit={this.handleSubmit}>
                        <div className={this.state.error.hasError ? "inputWrapperError" : "inputWrapper"}>
                            <img src={Search} alt="search icon" />
                            <input 
                                name="organization" 
                                placeholder="Buscar dieretório" 
                                value={this.state.repository} 
                                onChange={(event) => this.setState({ repository: event.target.value})} 
                                type="text" 
                                required 
                            />
                            {this.state.canCleanSearch && (
                                <button onClick={() => this.onReset()} type="button">
                                    <img src={closeButton} alt="close icon" />
                                </button>
                            )}
                        </div>
                    </form>
                    {this.state.error.message && (<h2>{this.state.error.message}</h2>)}
                </div>
                
                <div className="repositoryWrapper">
                    {this.state.repositories.map(repo => (
                        <div className="repositoryCard" key={repo.id}>
                            <a href={repo.clone_url} target="_blank" rel="noreferrer">{repo.name}</a>
                            <h2>{repo.description}</h2>
                            {repo.language && (
                                <div className="infoRepo">
                                <img src={circle} alt="circle" />
                                <span>{repo.language}</span>
                            </div>
                            )}
                            {repo.license && (
                            <div className="infoRepo">
                                <img src={scale} alt="scale" />
                                <span>{repo.license.name}</span>
                            </div>
                            )}
                            {repo.forks_count > 0 && (
                                <div className="infoRepo">
                                <img src={forks} alt="forks" />
                                <span>{repo.forks_count}</span>
                            </div>
                            )}
                            {repo.stargazers_count && (
                                <div className="infoRepo">
                                <img src={star} alt="star"/>
                                <span>{repo.stargazers_count}</span>
                            </div>
                            )}
                        </div>
                    ))}
                </div>
                
            </div>
            
        )
    }
}