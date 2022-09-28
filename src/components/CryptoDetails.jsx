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

console.log(coinDetails);


  
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
  <Col className='coin-detail-container'>
    <Col className='coin-heading-container'>
      <Title level={2} className="coin-name">
        {coinDetails?.coin.name} ({coinDetails?.coin.slug}) Price
      </Title>
      <p>{coinDetails?.coin.name} live price in US dollars.
      View value statistics, market cap and supply.
      </p>
    
    </Col>
    <Select defaultValue="7d" 
    className="select-timeperiod"
     placeholder="Select Time Period" 
     onChange={(value)=> setTimePeriod(value)}>
      
      {time.map((date)=><Option key={date}>{date}</Option>)}

     </Select>

     {/* /* line chart..... */ }

<Col className='stats-container'>
  <Col className='coin-value-statistics'>
    <Col className='coin-value-statistics-heading'>
      <Title level={3} className="coin-details-heading">{coinDetails?.coin.name} Value Statistics</Title>
      <p>An overview showing the stats of {coinDetails?.coin.name}</p>
    </Col>
    {stats.map(({icon, title, value})=>(
      <Col className='coin-stats'>
        <Col className='coin-stats-name'>
          <Text>{icon}</Text>
          <Text>{title}</Text>
        </Col>
      </Col>
    ))}
  </Col>

</Col>

  </Col>
  )
}

export default CryptoDetails