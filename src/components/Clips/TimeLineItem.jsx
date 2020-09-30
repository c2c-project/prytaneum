import React from 'react';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

/** Test Description
 *  @category Component
 *  @constructor TimeLineItem
*/
export default function TimeLineItem({ data, onClickPlay, onClickEdit, onClickDelete }) {
    return (
        // wrapper
        <div className='timeline-item'>
            <div className='timeline-item-content'>
                <span
                    className='tag'
                    style={{ background: data.category.color }}
                >
                    {data.category.tag}
                </span>
                <time>{`${data.start } to ${data.end}`}</time>
                <p>{data.question}</p>
                {/* <a href={data.link.url}>
                    {data.link.text}
                </a> */}
                {/* <Button onClick={clipEvent}> Click Here</Button> */}
                <Grid container>
                    <Button onClick={onClickPlay}><PlayArrowIcon /></Button>
                    <Button onClick={onClickEdit} className='timeline-item-edit'><EditIcon /></Button>
                    <Button onClick={onClickDelete}><DeleteIcon /></Button>
                </Grid>
                <span className='circle' />
            </div>
        </div>
        // <h1>Hello World</h1>
    );
}


TimeLineItem.propTypes = {
    data: PropTypes.shape({
        question: PropTypes.string,
        start: PropTypes.number,
        end: PropTypes.number,
        category: PropTypes.shape({
            tag: PropTypes.string,
            color: PropTypes.string,
        }),
        link: PropTypes.shape({
            text: PropTypes.string
        })
    }).isRequired,
    onClickPlay: PropTypes.func.isRequired,
    onClickEdit: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired,
}