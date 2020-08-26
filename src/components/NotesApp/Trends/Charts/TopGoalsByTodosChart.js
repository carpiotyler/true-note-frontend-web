import React from 'react'
import Plot from 'react-plotly.js';

const TopGoalsByTodosChart = function(props) {

    const findGoal = function(uuid) {
        return props.goals.find(goal => goal.uuid === uuid);
    }

    return (
        props.goals.length && props.topGoalsByTodos?
            <Plot 
                data={[{
                    labels: Object.keys(props.topGoalsByTodos).map(key => findGoal(key)?.title),
                    values: Object.values(props.topGoalsByTodos),
                    type: 'pie',
                    mode: 'markers',
                    hole: .4
                }]}
                layout={{title: 'Top Goals (Completed Todo Items)'}}
            /> : <div />
        
    )
}

export default TopGoalsByTodosChart;