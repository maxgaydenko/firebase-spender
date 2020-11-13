import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';

interface IProps {
 label: string
 outlayTags: string[]
 tags: string[]
 onTagsChange: (tags: string[]) => void
 onTagInput: (tag: string) => void
}

interface IValue {
 value: string
}

const filterOptions = createFilterOptions({
 matchFrom: 'start',
 trim: true,
 ignoreCase: true,
 ignoreAccents: true,
 stringify: (op: string) => op,
 // stringify: (option: FilmOptionType) => option.title,
});

export const TagsInput: React.FC<IProps> = ({label, outlayTags, tags, onTagsChange, onTagInput}) => {
 return (
  <Autocomplete options={outlayTags}
                multiple
                disableClearable
                includeInputInList
                filterSelectedOptions
                filterOptions={filterOptions}
                value={tags}
                fullWidth
                onChange={(_, value, reason) => {
                 onTagsChange(value);
                }}
                onInputChange={(_, value, reason) => {
                 // console.log('on input change', value, reason);
                }}
                renderInput={(params) => (
                 <TextField {...params}
                            onBlur={e => {
                             const tag = e.target.value.trim();
                             if (tag) {
                              onTagInput(tag)
                             }
                            }}
                            onKeyDown={e => {
                             if(e.keyCode===13) {
                              e.preventDefault();
                              const valueInputProps = params.inputProps as IValue;
                              const tag = valueInputProps.value.trim();
                              if(tag) {
                               onTagInput(tag);
                              }
                             }
                            }}
                            label={label}/>
                )}/>
 )
}


