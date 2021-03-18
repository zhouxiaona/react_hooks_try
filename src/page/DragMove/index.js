import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as homeActions from '../../redux/actions/home'
import { bindActionCreators } from 'redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    let newSourceClone = Object.assign([], sourceClone)

    const [removed] = newSourceClone.splice(droppableSource.index, 1);
    console.log(newSourceClone, '--newSourceClone--')
    console.log(sourceClone, '--sourceClone--')

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 0.3,
    margin: `${grid}px auto`,
    width: 60,
    height: 60,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'lightblue',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    width: 60 + grid,
    padding: grid,
});

const getListStyle2 = (isDraggingOver) => ({
    background: isDraggingOver ? 'pink' : 'lightgray',
    width: 60 + grid,
    padding: grid,
    margin: `${grid}px 0 0 0`,
});

class DragMove extends Component {
    state = {
        // items: getItems(10),
        // selected: getItems(5, 10),
        items: [
            {
                id: 'item1',
                src: 'https://imgs.xrspy.com/child/1.png'
            },
            {
                id: 'item2',
                src: 'https://imgs.xrspy.com/child/2.png'
            },
            {
                id: 'item3',
                src: 'https://imgs.xrspy.com/child/3.png'
            },
            {
                id: 'item4',
                src: 'https://imgs.xrspy.com/child/4.png'
            },
            {
                id: 'item5',
                src: 'https://imgs.xrspy.com/child/5.png'
            }
        ],
        selected: [
            {
                id: 'items1',
                src: ''
            },
            {
                id: 'items2',
                src: ''
            },
            {
                id: 'items3',
                src: ''
            },
            {
                id: 'items4',
                src: ''
            },
            {
                id: 'items5',
                src: ''
            }
        ]
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected',
    };

    getList = (id) => this.state[this.id2List[id]];

    onDragStart = (result) => {
        console.log(this.state.items, '--items--')
        // console.log(result, '--result-start-')
        // const { draggableId, source } = result;
    }

    onDragEnd = (result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            console.log(this.state.items, '--items--')
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                <Droppable droppableId="droppable" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            <img src={item.src} style={{ width: '100%' }} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle2(snapshot.isDraggingOver)}>
                            {this.state.selected.map((val, key) => (
                                <Draggable
                                    key={val.id}
                                    draggableId={val.id}
                                    index={key}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <img src={val.src} style={{ width: '100%' }} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}


const mapState = (state) => ({
    home: state.home
});
const mapDispatchToProps = (dispatch) => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}
export default connect(mapState, mapDispatchToProps)(DragMove);
