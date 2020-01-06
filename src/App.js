// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from 'react';
import '@gooddata/react-components/styles/css/main.css';
import moment from 'moment'
import { ColumnChart } from '@gooddata/react-components';

const grossProfitMeasure = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877';
const dateAttributeInMonths = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142';
const dateAttribute = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            year: 2016,
            month: 'January',
        }
    }

    getMonthFilter() {
        return {
            absoluteDateFilter: {
                dataSet: {
                    uri: dateAttribute
                },
                from: moment().year(this.state.year).month(this.state.month).startOf('month').format('YYYY-MM-DD'),
                to: moment().year(this.state.year).month(this.state.month).endOf('month').format('YYYY-MM-DD'),
            }

        }
    }

    getMeasures() {
        return [
            {
                measure: {
                    localIdentifier: 'm1',
                    definition: {
                        measureDefinition: {
                            item: {
                                uri: grossProfitMeasure
                            }
                        }
                    },
                    alias: '$ Gross Profit'
                }
            }
        ]
    }

    getViewBy() {
        return {
            visualizationAttribute:
            {
                displayForm: {
                    uri: dateAttributeInMonths
                },
                localIdentifier: 'a1'
            }
        }
    }

    onChangeMonth = e => {
        e && this.setState({ month: e.target.value })
    }

    renderDropdown() {
        return (
            <select defaultValue="January" onChange={this.onChangeMonth}>
                {moment.months().map((month, key) => <option value={month} key={key}>{month}</option>)}
            </select>
        )
    }

    render() {
        const projectId = 'xms7ga4tf3g3nzucd8380o2bev8oeknp';
        const filters = [this.getMonthFilter()];
        const measures = this.getMeasures();
        const viewBy = this.getViewBy();

        return (
            <div className="App">
                <h1>$ Gross Profit in month {this.renderDropdown()} {this.state.year}</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        filters={filters}
                        projectId={projectId}
                    />
                </div>
                <h1>$ Gross Profit - All months</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        viewBy={viewBy}
                        projectId={projectId}
                    />
                </div>
            </div>
        );
    }
}

export default App;
