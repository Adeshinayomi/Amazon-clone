
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions=[{
  id:'1',
  deliveryDays:4,
  priceCents:0
},{
  id:'2',
  deliveryDays:2,
  priceCents:499
},{
  id:'3',
  deliveryDays:1,
  priceCents:999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption = option
    }
  });

  return deliveryOption || deliveryOptions[0]
}

function isWeekend(date){
  const dayOfWeek=date.format('dddd')
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';

}

export function calculateDeliveeryDate(deliveryOption){
  let remainingDays=deliveryOption.deliveryDays
  let deliveryDate =dayjs()

  while(remainingDays>0){
    deliveryDate=deliveryDate.add(1,'day')

    if(!isWeekend(deliveryDate)){
      remainingDays--
    }
  }

  const dateString =deliveryDate.format('dddd, MMMM D');
  return dateString
}
export function todayDate(){
  const today=dayjs()
  const time=today.format('YYYY-MM-DDTHH:mm:ssZ[Z]')
  console.log(time)
  const dateString=today.format('MMMM D')

  return dateString;
}