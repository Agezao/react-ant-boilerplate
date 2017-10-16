import React, { Component } from 'react';
import { Link } from 'react-router';
import { Timeline, Card, Tabs, Icon, Table, Button  } from 'antd';
import MapComponent from '../map/map-component';
//
import UserService from '../../services/user.service';
import './home.scss';
const TabPane = Tabs.TabPane;

/* -- Placeholder Data --*/
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class Home extends Component {

	state = { 
		selectedRowKeys: [],
		loading: false,
	};

	componentDidMount() { }

	_onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

	_start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  render() {
		const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this._onSelectChange,
    };
		const hasSelected = selectedRowKeys.length > 0;
		
    return (
      <div className="home-page container-lg">
				<div className="col-8 pd-5">
					<Card>
						<div className="pd-10 pd-cl-h">
							<Button type="primary" onClick={this._start} disabled={!hasSelected} loading={loading}>Reload</Button>
							<span style={{ marginLeft: 8 }}> {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''} </span>
						</div>

						<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
					</Card>
				</div>
      	<div className="col-4 pd-5">
					<Card>
						<Tabs defaultActiveKey="2">
							<TabPane tab={<span><Icon type="shop" />Map View</span>} key="1">
								<MapComponent isMarkerShown={true} googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places" loadingElement={<div style={{ height: `100%` }} />} containerElement={<div style={{ height: `400px` }} />} mapElement={<div style={{ height: `100%` }} />} />
							</TabPane>
							<TabPane tab={<span><Icon type="bars" />Timeline</span>} key="2">
								<Timeline>
									<Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
									<Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
									<Timeline.Item color="red">
										<p>Solve initial network problems 1</p>
										<p>Solve initial network problems 2</p>
										<p>Solve initial network problems 3 2015-09-01</p>
									</Timeline.Item>
									<Timeline.Item>
										<p>Technical testing 1</p>
										<p>Technical testing 2</p>
										<p>Technical testing 3 2015-09-01</p>
									</Timeline.Item>
								</Timeline>
							</TabPane>
						</Tabs>
					</Card>
				</div>
      </div>
    );
  }
}

export default Home;
