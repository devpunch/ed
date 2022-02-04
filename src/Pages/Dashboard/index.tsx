import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";


import {Container} from "../../components/Container";
import DisciplineBlock from "./components/DisciplineBlock";
import StatsBlock from "./components/StatsBlock";

import map from './assets/map.png';

import s from './style.module.scss'
import {dataDashboardSelector, getDashboardAsync, isLoadingDashboardSelector} from "../../store/dashboardSlicer";
import {use} from "i18next";
import req from "../../utils/request";
import {configEndpoint} from "../../config";

interface dashboardProps {
  name?: string
}

export const DashBoard: React.FC<dashboardProps> = ({name = "Anton"}) => {
  //example redux token
  // const token = useSelector(userTokenSelector);

  const [res, setRes] = useState<any>({})

  // const data = useSelector(dataDashboardSelector);
  const getResult = async () => {
    const data = await req(configEndpoint.dashboard, {})

    setRes(data)
  }
  const isLoading = useSelector(isLoadingDashboardSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    getResult()
    dispatch(getDashboardAsync());
  }, [])

  return (
    <div className={s.wrap}>

      <Container>
        <h1 className={s.title}>
          {`Welcome, ${name}`}
        </h1>

        <p className={s.subtitle}>
          Now, you are ready to start you course
        </p>


        <div className={s.inner}>
          {
            isLoading ? (
              <div>...Loading</div>
            ) : (
              <>
                <div className={s.leftSide}>
                  <img className={s.map} src={map} alt="map"/>
                  <DisciplineBlock/>
                </div>
                <div className={s.rightSide}>
                  <StatsBlock
                    testScore={res.data?.units[0]?.testScore}
                    tasks={res.data?.units[0]?.tasks.length}
                    skill={res.data?.totalProgress.skill.index}
                    habit={res.data?.totalProgress.habit.index}
                  />
                </div>
              </>
            )
          }

        </div>

      </Container>
    </div>
  )
}
