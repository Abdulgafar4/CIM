import { BsBoxArrowLeft, BsMinecartLoaded } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { MdOutlineSell } from "react-icons/md";

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

export const detailCardData = [
  {
    title: "Sales",
    icon: <MdOutlineSell size={20} />,
  },
  {
    title: "Expenses",
    icon: <GiPayMoney size={20} />,
  },
  {
    title: "Purchases",
    icon: <BsMinecartLoaded size={20} />,
  },
  {
    title: "CashFlow",
    icon: <BsBoxArrowLeft size={20} />,
  },
];

export function getCurrentMonthTotalAmount(data) {
  const currentData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return (
      itemDate.getFullYear() === currentYear &&
      itemDate.getMonth() + 1 === currentMonth
    );
  });

  const currentMonthTotalAmount = currentData.reduce((acc, item) => {
    return acc + item.subTotal;
  }, 0);
  return currentMonthTotalAmount;
}

export function getMonthlyTotals(data) {
  
  let monthlyTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  let year = new Date().getFullYear();

  for (let month = 0; month < 12; month++) {
    const items = data.filter(item => {
      const date = new Date(item.createdAt);
      const itemYear = date.getFullYear();

      if (itemYear !== year) {
        // Reset totals 
        monthlyTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        year = itemYear;
      }
      return date.getMonth() === month;
    });
    const total = items.reduce((acc, item) => {
      return acc + Number(item.subTotal || item.amount);
    }, 0);
    monthlyTotals[month] = total;

  }

  return monthlyTotals;

}

export function getYearlyTotal(monthlyTotals) {

  let yearlyTotal = 0;

  for (let amount of monthlyTotals) {
    yearlyTotal += amount;
  }

  return yearlyTotal;

}