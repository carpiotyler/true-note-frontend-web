import React from 'react'
import Plot from 'react-plotly.js';

const TopGoalsByNotesChart = function(props) {

    const findGoal = function(uuid) {
        return props.goals.find(goal => goal.uuid === uuid);
    }

    return (
        props.goals.length && props.topGoalsByNotes?
            <Plot 
                data={[{
                    labels: Object.keys(props.topGoalsByNotes).map(key => findGoal(key)?.title),
                    values: Object.values(props.topGoalsByNotes),
                    type: 'pie',
                    mode: 'markers',
                    hole: .4
                }]}
                layout={{title: 'Top Goals (Notes)'}}
            /> : <div />
        
    )
}

export default TopGoalsByNotesChart;