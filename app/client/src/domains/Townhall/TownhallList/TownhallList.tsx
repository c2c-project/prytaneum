import * as React from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemIcon,
    Avatar,
    ListItemSecondaryAction,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    DialogContent,
} from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ResponsiveDialog from '@local/components/ResponsiveDialog';
import Button from '@material-ui/core/Button';

import type { Townhall } from 'prytaneum-typings';

import { formatDate } from '@local/utils/format';
import useEndpoint from '@local/hooks/useEndpoint';
import Loader from '@local/components/Loader';
import ListFilter from '@local/components/ListFilter';
import { townhallSettingsSections } from '@local/domains/Townhall/TownhallSettings/TownhallSettings';
import { getTownhallList } from '../api';
import { filters as filterFuncs, TonwhallFilterFunc, search, applyFilters } from './utils';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(0, 0, 2, 0),
    },
    card: {
        width: '100%',
        paddingBottom: theme.spacing(3),
    },
    title: {
        paddingBottom: 0,
        marginBottom: 0,
    },
}));

interface Props {
    onClickTownhall: (id: string) => void;
    title?: string;
}

export default function TownhallList({ onClickTownhall, title }: Props) {
    const classes = useStyles();
    const [townhallSettingsSelected, setTownhallSettingsSelected] = React.useState<string[]>([]);
    const [townhallIdToCopy, setTownhallIdToCopy] = React.useState<string>();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [list, setList] = React.useState<Townhall[] | null>(null);

    // search is always the first element in the filter array
    const [filters, setFilters] = React.useState<TonwhallFilterFunc[]>([(townhalls: Townhall[]) => townhalls]);
    const [, isLoading] = useEndpoint(() => getTownhallList(), {
        onSuccess: (results) => {
            setList(results.data);
        },
        runOnFirstRender: true,
    });
    const filteredResults = React.useMemo(() => applyFilters(list || [], filters), [list, filters]);

    const handleSearch = React.useCallback(
        (text: string) =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            setFilters(([_prevSearch, ...otherFilters]) => [
                (filteredList) => search(text, filteredList),
                ...otherFilters,
            ]),
        []
    );

    if (isLoading || !list) return <Loader />;

    if (list.length === 0) {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Typography variant='h4'>No Townhalls to display</Typography>
            </div>
        );
    }

    const handleSettingSelected = (setting: string) => () => {
        const currentIndex = townhallSettingsSelected.indexOf(setting);
        const newSettings = [...townhallSettingsSelected];
        if (currentIndex === -1) {
            newSettings.push(setting);
        } else {
            newSettings.splice(currentIndex, 1);
        }
        setTownhallSettingsSelected(newSettings);
    };

    return (
        <div className={classes.root}>
            <Card raised className={classes.card}>
                {title && <CardHeader title={title} className={classes.title} />}
                <CardContent>
                    <ListFilter
                        filterMap={filterFuncs}
                        onSearch={handleSearch}
                        onFilterChange={(newFilters) => setFilters(([searchFunc]) => [searchFunc, ...newFilters])}
                        length={filteredResults.length}
                    />

                    <List>
                        {filteredResults.map(({ form, _id }) => (
                            <ListItem
                                key={_id}
                                divider
                                button
                                alignItems='flex-start'
                                onClick={() => onClickTownhall(_id)}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt='Speaker'
                                        src='' // FIXME:
                                    >
                                        {form.title[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={form.title} secondary={formatDate(form.date)} />
                                <ListItemSecondaryAction>
                                    <ChevronRight />
                                    <IconButton
                                        onClick={(e) => {
                                            setAnchorEl(e.currentTarget);
                                            setTownhallIdToCopy(_id);
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                        <MenuItem
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            copy
                        </MenuItem>
                    </Menu>
                    <ResponsiveDialog
                        open={open}
                        onClose={() => setOpen(false)}
                        onExit={() => setTownhallSettingsSelected([])}
                    >
                        <DialogContent>
                            <Typography variant='h5'>Which settings would you like to copy?</Typography>
                            <List>
                                {townhallSettingsSections.map((settingsSection, index) => (
                                    <ListItem key={index} dense button onClick={handleSettingSelected(settingsSection)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge='start'
                                                checked={townhallSettingsSelected.includes(settingsSection)}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={settingsSection} />
                                    </ListItem>
                                ))}
                            </List>
                            {/*  TODO: onlick submit request to copy townhall */}
                            <Button
                                variant='contained'
                                fullWidth
                                color='primary'
                                onClick={() => console.log(townhallSettingsSelected)}>
                                Submit
                            </Button>
                        </DialogContent>
                    </ResponsiveDialog>
                </CardContent>
            </Card>
        </div>
    );
}

TownhallList.defaultProps = {
    title: '',
};
