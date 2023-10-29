"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/dashboard/dashboard.module.scss";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Highlighter from "react-highlight-words";
import { CONSTANTS, displayWeek, week } from "@/constants";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  storeTimings: {
    "& .MuiPaper-root": {
      "& .MuiAccordionSummary-root": {
        marginTop: 0,
        minHeight: "20px",
        "& .Mui-expanded": {
          margin: 0,
          minHeight: "20px",
        },
      },
    },
  },
});

export const Card = ({ store, searchText, storeDetails = false }) => {
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [openingTime, setOpeningTime] = useState("");

  const currDate = new Date();
  const currrDay = week[currDate.getDay()];
  const currTime = currDate.getHours();
  let openTime = store.timings[currrDay].open.split(":")[0];
  let closeTime = store.timings[currrDay].close.split(":")[0];

  useEffect(() => {
    if (openTime < currTime && closeTime > currTime && !store.timings[currrDay].closed) setIsStoreOpen(true);
    else if (openTime && currTime < openTime) {
      setIsStoreOpen(false);
      setOpeningTime(`Close - Opens at  ${openTime}`);
    } else {
      setIsStoreOpen(false);
      if (store.timings[week[currDate.getDay() + 1]].open === "") {
        setOpeningTime(`Close - Opens at ${week[currDate.getDay() + 2]} ${store.timings[week[currDate.getDay() + 2]].open.split(":")[0]}`);
      } else setOpeningTime(`Close - Opens at ${store.timings[week[currDate.getDay() + 1]].open.split(":")[0]}`);
    }
  }, [store]);

  const getTweleveHrTime = (time) => {
    if (time > 12) return `${time - 12} PM`;
    return `${time} AM`;
  };

  const classes = useStyles();

  return (
    <>
      {storeDetails ? (
        <div className={styles.brandContact}>
          <p>{CONSTANTS.CALL}</p>
          <h3>{CONSTANTS.NUMBER}</h3>
          <p>{CONSTANTS.WRITE_TO_US}</p>
          <h3>{CONSTANTS.BRAND_EMAIL}</h3>
        </div>
      ) : (
        ""
      )}
      <div className={styles.card}>
        <img className={styles.storeImg} src={store.imageUrl} width={400} height={500}></img>
        {storeDetails ? (
          <div className={styles.storeDetails}>
            <Box>
              <h2>{store.name}</h2>
              <p>{store.description}</p>
              <div style={{ display: "flex", columnGap: "50px", marginTop: "50px" }}>
                <div className={styles.contactDetails}>
                  <h4 className={styles.title}>Contact Details</h4>
                  <p>
                    {store.address.street}
                    <br />
                    {store.address.state}
                    <br />
                    {store.address.country}
                  </p>
                  <p>{store.phone}</p>
                </div>
                <div className={classes.storeTimings}>
                  <h4 className={styles.title}>Store Timings</h4>
                  <Accordion sx={{ boxShadow: "none", width: "300px", padding: 0 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: "20px", padding: 0 }}>
                      <p>{isStoreOpen ? `Open - Closes at ${getTweleveHrTime(closeTime)}` : `${getTweleveHrTime(openingTime)}`}</p>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0, textAlign: "left" }}>
                      <table>
                        <tbody>
                          {displayWeek.map((day) => {
                            const weekDay = day.toLowerCase();
                            return (
                              <tr className={weekDay === currrDay ? "bold" : ""}>
                                <td style={{ paddingRight: "60px" }}>{day}</td>
                                <td>{store.timings[weekDay].closed ? `Closed` : `${getTweleveHrTime(store.timings[weekDay].open.split(":")[0])} - ${getTweleveHrTime(store.timings[weekDay].close.split(":")[0])}`}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </Box>
          </div>
        ) : (
          <div className={styles.storeDetails}>
            <Box>
              <h2>
                <Highlighter highlightClassName="highlightClass" searchWords={[searchText]} autoEscape={true} textToHighlight={store.name} />
              </h2>
              <p>
                {store.address.street}
                <br />
                {store.address.state}
                <br />
                {store.address.country}
              </p>
              <p>{store.phone}</p>
              <p>{isStoreOpen ? `Open - Closes at ${getTweleveHrTime(closeTime)}` : `${getTweleveHrTime(openingTime)}`}</p>
            </Box>
          </div>
        )}
      </div>
    </>
  );
};
