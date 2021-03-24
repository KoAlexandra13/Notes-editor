import React from 'react';
import _ from 'lodash';
import Creatable from 'react-select/creatable';

function tagsParser(data){
    const allTags = _.flatten(data.map(note => note.tags));

    const options = allTags.map(tag => {
        const option = {
            label: tag, value: tag,
        }
        return option; 
    })

    return options;
}

export default function Filter(props) {
    const {notes, filterByTags} = props;
    const options = tagsParser(notes);
    return (
        <div className='filter-container'>
          <Creatable
                isMulti
                options={options}
                placeholder='Select or input tags for filtering'
                className='w-100 custom-select-box'   
                classNamePrefix='custom-select-box'
                closeMenuOnSelect ={false}
                onChange={(selectOptions) => filterByTags(selectOptions)}
            />
        </div>
    )
}