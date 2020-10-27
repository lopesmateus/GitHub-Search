import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import mapPin from '../../img/map-pin.png';
import link from '../../img/link.png';

export default class OrganizationCard extends Component {
    render() {
        const { isSimple, org } = this.props;
        return isSimple ? (
            <div className="organizationCard">
                <Link to={`/organization/${org.login}`} className="linkWrapper">
                    <div className="orgs">
                        <img src={org.avatar_url} className="logoCard" alt="avatar"/>
                    </div>
                    <div className="orgs">
                        <h1 className="organizationName">{org.name}</h1>
                        <h2 className="organizationDescription">{org.description}</h2> 
                    </div>
                </Link>
            </div>
        ) : (
            <div className="organizationCardRepo">
                    <div className="imageWrapper">
                        <img src={org.avatar_url} className="organizationImage" alt="org avatar"/>
                    </div>
                    <div className="orgsCentered">
                        <h1 className="organizationNameRepo">{org.name}</h1>
                        <h2 className="organizationDescriptionRepo">{org.description}</h2>
                        <div className="orgInfo">
                            {org.location && <div>
                                <img src={mapPin} alt="pin"/>
                                <h2 className="organizationLocation">{org.location}</h2> 
                            </div>}
                            {org.blog && <div>
                                <img src={link} alt="link"/>
                                <a href={org.blog} target="_blank" rel="noreferrer">{org.blog}</a> <br/>
                            </div>}  
                        </div>
                        <a href={org.html_url} className="repositoryLink" target="_blank" rel="noreferrer">Visitar org.</a>
                    </div>          
            </div>
        );
    }

} 