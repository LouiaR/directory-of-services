import React, { Component, Fragment } from 'react';
import Grid from 'material-ui/Grid';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import Search from './Search';
import TopNav from '../TopNav';
import helpers from '../../helpers';
import Benefits from '../../Data/json/Benefits.json';
import Debt from '../../Data/json/Debt.json';
import Education from '../../Data/json/Education.json';
import YPFamilies from '../../Data/json/YoungPeopleChildren.json';
import WomenDV from '../../Data/json/Women.json';
import Trafficking from '../../Data/json/Trafficking.json';
import Destitution from '../../Data/json/Destitution.json';
import LGBTQI from '../../Data/json/LGBTQI.json';
import MentalHealth from '../../Data/json/MentalHealthServices.json';
import Healthcare from '../../Data/json/Healthcare.json';
import OrganisationCard from './OrganisationCard';
import './index.css';

class Organisations extends Component {

  state = {
    organisations: {
      Education: Education.data,
      Debt: Debt.data,
      Benefits: Benefits.data,
      YPFamilies: YPFamilies.data,
      WomenDV: WomenDV.data,
      Trafficking: Trafficking.data,
      Destitution: Destitution.data,
      LGBTQI: LGBTQI.data,
      MentalHealth: MentalHealth.data,
      Healthcare: Healthcare.data,
    },
    editIdx: -1,
  }

  editSelectedOrganisation = (idex) => (
    this.setState({
      editIdx: idex,
    })
  );

  stopEditing = () => {
    this.setState({
      editIdx: -1,
    });
  };

  render() {
    const { editIdx } = this.state;
    const { params } = this.props.match;
    const service =
      params && params.service
        ? helpers.capitaliseAndPrettify(params.service)
        : null;
    const organisations = this.state.organisations && this.state.organisations[service] ? this.state.organisations[service] : [];
    return (
      <div>
        <TopNav title={service} addLink="organisations/add" titleLink={`services/${service}`} />
        <Search />
        <Grid container className="organisation-page" spacing={24}>
          {organisations.map((org, index) => {
            const currentlyEditing = editIdx === index;
            return currentlyEditing ? (
              <Fragment>
                <EditOrganisation stopEditing={this.stopEditing} show editOrgData={org} />
                <SingleOrganisation stopEditing={this.stopEditing} handleShawDetails editOrgData={org} />
              </Fragment>) : (
                <Grid item xs={12} sm={6}>
                  <OrganisationCard org={org} index={index} />
                </Grid>
              )
          })}
        </Grid>
      </div>
    );
  }
};

export default Organisations;