import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import values from 'lodash/values';
import moment from 'moment';
import { connect } from 'react-redux';
import { getActivity } from '../actions/activityActions';
import Activity from '../components/Activity';

class ActivityContainer extends Component {
  componentWillMount() {
    if (!this.props.items) {
      this.props.dispatch(getActivity());
    }
  }

  render() {
    const { items } = this.props;

    return !items ? (
      <div>Activity not found</div>
    ) : (
      <Activity items={items} />
    );
  }
}

ActivityContainer.propTypes = {
  items: PropTypes.array,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  const { activity } = state.entities;

  const items = isEmpty(activity) ? null : values(activity)
    .sort((a, b) => b.createdAt - a.createdAt)
    .filter((item, i) => i < 15)
    .map(item => {
      const date = moment.unix(item.createdAt).format('D MMM [at] HH:mm');
      return {
        ...omit(item, ['createdAt']),
        date,
      };
    });

  return { items };
}

export default connect(
  mapStateToProps
)(ActivityContainer);
