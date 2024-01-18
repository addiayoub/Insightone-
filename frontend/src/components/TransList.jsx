import React, { useState, useEffect } from "react";
import {
  Grid,
  List,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider,
  Box,
  Button,
  TextField,
} from "@mui/material";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const TransList = ({ checked, setChecked, left, setLeft, right, setRight }) => {
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [leftSearchTerm, setLeftSearchTerm] = useState("");
  const [rightSearchTerm, setRightSearchTerm] = useState("");

  const filteredLeft = left.filter(
    (value) =>
      value.includes(leftSearchTerm) ||
      value.toLowerCase().includes(leftSearchTerm.toLowerCase())
  );

  const filteredRight = right.filter(
    (value) =>
      value.includes(rightSearchTerm) ||
      value.toLowerCase().includes(rightSearchTerm.toLowerCase())
  );

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };
  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const generateList = (title, items, searchSetter) => (
    <Card sx={{ width: "300px" }}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} choisi`}
      />
      <TextField
        label="Rechercher"
        value={
          searchSetter === setLeftSearchTerm ? leftSearchTerm : rightSearchTerm
        }
        size="small"
        onChange={(e) => searchSetter(e.target.value)}
        sx={{ margin: "7px" }}
      />
      <Divider />
      <List
        sx={{
          maxWidth: "300px",
          height: 350,
          overflow: "auto",
          bgcolor: "background.paper",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid className="flex flex-wrap items-center gap-2.5 self-start">
      <Grid item>
        {generateList("Choisi", filteredLeft, setLeftSearchTerm)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {generateList("Choisi", filteredRight, setRightSearchTerm)}
      </Grid>
    </Grid>
  );
};

export default TransList;
