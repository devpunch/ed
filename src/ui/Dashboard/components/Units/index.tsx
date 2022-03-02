import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import cn from 'classnames';

import {Button} from "../../../components/Button";
import {unitsProps} from "../../../../domain/Dashboard/units";
import s from './style.module.scss';

import check from './assets/check.svg'
import norm from './assets/norm.svg'
import fail from './assets/fail.svg'
import req from "../../../../services/request";
import {configEndpoint} from "../../../../config";


const Units = (
  {
    title,
    unitList,
    scoreList = [],
    urlRelocate,
    btnName,
    isShowActiveTask,
    isSuccess,
    unitScore,
    unitIcon,
    unitTask,
    isRetry,
    unitNumber,
    tutorialName
  }: unitsProps
) => {
  const [showUnit, setSetShowUnit] = useState(false);
  const navigate = useNavigate();
  const handleClickActive = () => {
    if (isShowActiveTask || isSuccess) {
      setSetShowUnit(!showUnit)
    }
  }

  const handleRelocateClick = () => {
    navigate(urlRelocate)
  }

  const handleReadClick = (index: any) => {
    navigate(`/${tutorialName}/unit1/${index + 1}`, {state: {readonly: true}})
  }

  const handleRetryTask = (index: any) => {
    if (isRetry.tasks[index].retry.canRetryByCount === true || isRetry.tasks[index].retry.inRetry === false) {
      const fetchByDate = async () => {
        const data = await req(configEndpoint.inRetryCount, {
          "tutorial": "PersonalFinance",
          "unit": isRetry.unit,
          "task": isRetry.tasks[index].task
        })
        return data
      }
      fetchByDate();

    }
    if (isRetry.tasks[index].retry.inRetry === true) {
      navigate(`/${tutorialName}/unit${unitNumber + 1}/${index + 1}`, {state: {retry: true}})
    }
  }

  return (
    <div
      className={cn(s.wrap, {
        [s.showActive]: isShowActiveTask
      })}
    >
      <div
        onClick={handleClickActive}
        className={s.header}
      >
        {
          unitScore ? (
            <div className={s.checkIcon}>
              {unitScore >= 80 ? <img src={check} alt="icon"/> : (
                <div className={cn(s.dropdownBtn, {
                  [s.active]: showUnit
                })}>
                  <span/>
                </div>
              )
              }
            </div>
          ) : (
            <div className={cn(s.dropdownBtn, {
              [s.active]: showUnit
            })}>
              <span/>
            </div>
          )
        }

        <div className={s.headerTitleBlock}>
          <h1 className={cn(s.headerTitle, {
            [s.itemDone]: unitScore ? unitScore <= 100 : null,
            [s.itemNormal]: unitScore ? unitScore < 80 : null,
            [s.itemFail]: unitScore ? unitScore < 60 : null
          })}>
            {title}
          </h1>
          <p className={cn(s.headerTitleScore, {
            [s.itemDone]: unitScore ? unitScore <= 100 : null,
            [s.itemNormal]: unitScore ? unitScore < 80 : null,
            [s.itemFail]: unitScore ? unitScore < 60 : null
          })}>
            {
              unitScore ? `${unitScore}%` : null
            }
          </p>
        </div>
      </div>
      {
        (isShowActiveTask || isSuccess) && (
          <>
            <div className={cn(s.tasksBlock, {
              [s.active]: showUnit,
            })}>
              {
                Object.values(unitList)?.map((item: any, index: number) => (
                  <div
                    className={s.unitItem}
                    key={index}
                  >
                    <div
                      className={s.unitItemNameBlock}
                    >
                      {
                        scoreList[index]?.taskScore !== 0 ?
                          (scoreList[index]?.taskScore >= 80 ? <img src={check} alt="done icon"/> :
                            scoreList[index]?.taskScore >= 60 ? <img src={norm} alt="done icon"/> :
                              <img src={fail} alt="done icon"/>) : (
                            <img src={unitIcon[index]} alt="unit icon"/>
                          )
                      }

                      <p
                        onClick={() => handleReadClick(index)}
                        className={cn(s.unitItemName, {
                          [s.unitItemNameDone]: scoreList[index]?.taskScore !== 0 ? scoreList[index]?.taskScore <= 100 : null,
                          [s.unitItemNameNormal]: scoreList[index]?.taskScore !== 0 ? scoreList[index]?.taskScore < 80 : null,
                          [s.unitItemNameFail]: scoreList[index]?.taskScore !== 0 ? scoreList[index]?.taskScore < 60 : null,
                        })}
                      >
                        {item}
                      </p>
                    </div>
                    <div className={s.scoreBlock}>

                      {
                        (index === 1 || index === 3 || index === 4 || index === 5) && (
                          <>
                            {
                              ((scoreList[index]?.taskScore < 100 && scoreList[index]?.taskScore !== 0) || scoreList[index].task === 6) && (
                                <Button
                                  size="reTry"
                                  variant="bgBlue"
                                  onClick={() => handleRetryTask(index)}
                                >
                                  { isRetry.tasks[index].retry.canRetryByTime === true ? "Free": "Retry" }
                                </Button>
                              )
                            }
                            {
                              scoreList[index]?.taskScore !== 0 && (
                                <p className={cn(s.unitItemNameScore, {
                                  [s.unitItemNameDone]: scoreList[index]?.taskScore ? scoreList[index]?.taskScore <= 100 : null,
                                  [s.unitItemNameNormal]: scoreList[index]?.taskScore < 80,
                                  [s.unitItemNameFail]: scoreList[index]?.taskScore < 60,
                                })}>
                                  {scoreList[index]?.taskScore !== undefined || null || undefined ? `${scoreList[index]?.taskScore}%` : null}
                                </p>
                              )
                            }

                          </>
                        )
                      }

                    </div>

                  </div>
                ))
              }
            </div>
            {
              isShowActiveTask && (
                <Button
                  onClick={handleRelocateClick}
                  variant="bgBlue"
                  margin="25px auto 0"
                >
                  {btnName}
                </Button>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default Units;