import React, {useEffect, useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import {Col, Row, Typography, Select} from "antd"
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {useGetCryptoDetailsQuery} from '../services/cryptoApi';

const {Title, Text} = Typography
const {Option}= Select

const CryptoDetails = () => {
  const {coinId} = useParams() //allow us to take id from url and allow us to use them us a variable
  const [timePeriod, setTimePeriod] = useState('7d')
  const {data, isFetching} = useGetCryptoDetailsQuery(coinId)
  // const cryptoDetails = data?.data?.coin
 
  
const coinDetails = data?.data


  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${coinDetails?.coin.price && millify(coinDetails?.coin.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coinDetails?.coin.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${coinDetails?.coin.volume && millify(coinDetails?.coin.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${coinDetails?.coin.marketCap && millify(coinDetails?.coin.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(coinDetails?.coin.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: coinDetails?.coin.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: coinDetails?.coin.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: coinDetails?.coin.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(coinDetails?.coin.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(coinDetails?.coin.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];
  

  if (isFetching) return "Loading...";


  return (
    <>
    <div>
      CryptoDetails {coinId}
      </div>
   
    </>
  )
}

export default CryptoDetails