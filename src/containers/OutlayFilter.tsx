import React from "react";

import Drawer from '@material-ui/core/Drawer';
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Badge from '@material-ui/core/Badge';
import TextField from "@material-ui/core/TextField";
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {Chip} from "@material-ui/core";

import {IOutlayFilter} from "../interfaces/OutlayFilter";
import {useOutlayStyles} from "../styles/outlay";

type FilterOptionMode = 'section' | 'tag' | 'comment';

interface IFilterOption {
 title: string
 mode: FilterOptionMode
}

const filterOptions = createFilterOptions({
 matchFrom: 'start',
 trim: true,
 ignoreCase: true,
 ignoreAccents: true,
 stringify: (op: IFilterOption) => op.title,
 // stringify: (option: FilmOptionType) => option.title,
});

interface IProps {
 outlaySections: string[]
 outlayTags: string[]
 filter: IOutlayFilter
 updateFilter: (filter: IOutlayFilter) => void
}

const renderOption = (op: IFilterOption): React.ReactNode => <span>{optionLabel(op)}</span>

const optionLabel = (op: IFilterOption): string => {
 if(op.mode==="section")
  return "раздел: " + op.title;
 if(op.mode==="tag")
  return "метка: " + op.title;
 if(op.mode==="comment")
  return "в тексте: " + op.title;
 return op.title;
}

export const OutlayFilter: React.FC<IProps> = ({outlaySections, outlayTags, filter, updateFilter}) => {
 const classes = useOutlayStyles();
 const [searchVisible, setSearchVisible] = React.useState<boolean>(false);
 const options: IFilterOption[] = [];
 if (filter.section) {
  options.push({title: filter.section, mode: 'section'});
 } else {
  if (outlaySections)
   for (let i = 0; i < outlaySections.length; i++)
    options.push({title: outlaySections[i], mode: 'section'});
 }
 for (let i = 0; i < outlayTags.length; i++)
  options.push({title: outlayTags[i], mode: "tag"});

 const value: IFilterOption[] = [];
 if (filter.section)
  value.push({title: filter.section, mode: "section"});
 for (let i = 0; i < filter.tags.length; i++)
  value.push({title: filter.tags[i], mode: "tag"});
 if (filter.comment)
  value.push({title: filter.comment, mode: "comment"});

 const onChange = (items: IFilterOption[]) => {
  let tags: string[] = [];
  let section: string = "";
  let comment: string = "";
  for (let i = 0; i < items.length; i++) {
   if (items[i].mode === "section")
    section = items[i].title;
   if (items[i].mode === "tag")
    tags.push(items[i].title);
   if (items[i].mode === "comment")
    comment = items[i].title;
  }
  updateFilter({section, tags, comment});
 }

 const searchClick = () => {
  setSearchVisible(true);
 }
 const searchHide = () => {
  setSearchVisible(false);
 }
 const filterBadge: number = filter.tags.length + (filter.section ? 1 : 0);

 return (
  <>
   <IconButton className={"search"} onClick={searchClick}>
    <Badge badgeContent={filterBadge} color="secondary" overlap="circle">
     <SearchIcon/>
    </Badge>
   </IconButton>
   <Drawer anchor={"top"}
           open={searchVisible}
           onClose={searchHide}>
    <Container className={classes.outlayFilter} maxWidth={"md"}>
     <Autocomplete multiple
                   value={value}
                   filterSelectedOptions
                   filterOptions={(options, params) => {
                    const filtered = filterOptions(options, params);
                    const q = params.inputValue.trim();
                    if (q) {
                     filtered.push({title: q, mode: "comment"});
                    }
                    return filtered;
                   }}
      // filterOptions={filterOptions}
                   getOptionLabel={option => option.title}
                   getOptionSelected={(option, value) => {
                    return Boolean((option.title === value.title && option.mode === value.mode));
                   }}
                   onChange={(_, value) => {
                    onChange(value);
                   }}
                   renderOption={renderOption}
                   renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                     <Chip label={optionLabel(option)} {...getTagProps({index})} />
                    ))
                   }
                   renderInput={(params) => (
                    <TextField {...params}
                               inputRef={input => input && input.focus()}/>
                   )}
                   options={options}/>
     {/*
     <Autocomplete options={options}
                   multiple
                   includeInputInList
                   filterSelectedOptions
                   filterOptions={filterOptions}
                   value={value}
                   popupIcon={null}
                   // getOptionSelected={(option, value) => {
                   //  console.log('option', option, value);
                   //  return true;
                   // }}
                   getOptionLabel={(option) => option.title}
                   onChange={(_, value, reason) => {
                    onChange(value);
                    console.log('on change', value);
                   }}
                   onInputChange={(_, value, reason) => {
                    console.log('on input change', value, reason);
                   }}
                   renderInput={(params) => (
                    <TextField {...params}
                               inputRef={input => input && input.focus()}
                               onKeyDown={onKeyDown}
                               label={"Поиск"}/>
                   )}/>
     */}
    </Container>
   </Drawer>
  </>
 )
}