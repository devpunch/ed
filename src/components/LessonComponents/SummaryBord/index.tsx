import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import {QuestionFooter} from "../QuestionFooter";
import {Container} from "../../Container";

import map from './assets/source_map.png';
import achievementIcon from './assets/achiv.svg';

import s from './style.module.scss';
import {progressMenuSelector} from "../../../store/progressMenuSlicer";
import req from "../../../utils/request";
import {configEndpoint} from "../../../config";

export const SummaryBord2 = () => {
  const menu = useSelector(progressMenuSelector);
  const navigate = useNavigate();

  // useEffect( () => {
  //   const data: any = req(configEndpoint.getKeyValue, {
  //     "keys": [
  //       "progressMenuUnit1"
  //     ]
  //   });
  //   if (!data) {
  //     navigate("/lessons/1")
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   localStorage.setItem("key", JSON.stringify(menu));
  // }, [menu])

  return (
    <Container>
      <div className={s.content}>
        <div className={s.leftSide}>
          <h1 className={s.title}>
            Congratulations! <br/>
            You’ve finished your first unit
          </h1>
          <p className={s.descr}>
            We hope you enjoyed it, to continue learning create an account
          </p>
          <img src={map} alt="map"/>

          <div className={s.score}>
            <div className={s.testScore}>
              <div className={s.num}>
                90%
              </div>
              <div className={s.text}>
                Your Test score
              </div>
            </div>
            <div className={s.taskCompleted}>
              <div className={s.num}>
                {menu.length}
              </div>
              <div className={s.text}>
                Tasks completed
              </div>
            </div>
          </div>

          <div className={s.achievements}>
            <div className={s.head}>
              <p className={s.plus}>+</p>
              <p className={s.achievementsText}>New achievements</p>
              <div className={s.line}/>
            </div>
            <div className={s.achievementsList}>
              <div className={s.achievementsItem}>
                <div className={s.achiv}>
                  <img src={achievementIcon} alt="achievement"/>
                </div>
                <p className={s.achivDescr}>
                  хороший старт
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <QuestionFooter
        btnName={"Create an account"}
        onClickNext={() => navigate("/register")}
        index={menu.length}
        id={menu.length}
        length={menu.length}
        time={"Completed"}
      />

    </Container>

  )
}