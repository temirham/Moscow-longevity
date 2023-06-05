import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { createStore } from 'redux'


const dataSlice = createSlice({
    name: "data",
    initialState: {
        isAuthenticated: false,
        isStaff: false,
        Draw: [],
        BookingService: [],
        Services: [],
        Booking: [],
        SumShoppingCart: 0,
        Service_id: 0,
        User_id: 0,
    },
    reducers: {
        setServices(state, {payload}) {  // изменяем состояние на полученные данные
            state.Services = payload
        },
        setBooking(state, {payload}) {  // изменяем состояние на полученные данные
            state.Booking = payload
        },
        setSum(state, {payload}) {  // суммируем цены выбранных товаров
            state.SumShoppingCart += payload
        },
        setDraw(state, {payload}) {
            state.Draw = payload
        },
        setBookingService(state, {payload}) {
            state.BookingService = payload
        },
        delSum(state) {  // обнуляем сумму выбранных товаров
            state.SumShoppingCart = 0
        },
        setIsAuthenticated(state, {payload}){
            state.isAuthenticated = payload
        },
        setIsStaff(state, {payload}){
            state.isStaff = payload
        },
        setService_id(state, {payload}){
            state.Service_id = payload
        },
        setUser_id(state, {payload}){
            state.User_id = payload
        },
        delDraw(state) {  // обнуляем сумму выбранных товаров
            state.Draw = [];
        },
        delBookingService(state) {  // обнуляем сумму выбранных товаров
            state.BookingService = [];
        },
    }
})


export const useServices = () =>
    useSelector((state) => state.ourData.Services)

export const useBooking = () =>
    useSelector((state) => state.ourData.Booking)

export const useDraw = () =>
    useSelector((state) => state.ourData.Draw)

export const useBookingService = () =>
    useSelector((state) => state.ourData.BookingService)

export const useService_id = () =>
    useSelector((state) => state.ourData.Service_id)
export const useUser_id = () =>
    useSelector((state) => state.ourData.User_id)
export const useSum = () =>
    useSelector((state) => state.ourData.SumShoppingCart)
export const useIsAuthenticated = () =>
    useSelector((state) => state.ourData.isAuthenticated)
export const useIsStaff = () =>
    useSelector((state) => state.ourData.isStaff)

export const {
    setServices: setServicesAction,
    setBooking: setBookingAction,
    setDraw: setDrawAction,
    setBookingService: setBookingServiceAction,
    setService_id: setService_idAction,
    setUser_id: setUser_idAction,
    setSum: setSumAction,
    delSum: delSumAction,
    delDraw: delDrawAction,
    delBookingService: delBookingServiceAction,
    setIsAuthenticated: setIsAuthenticatedAction,
    setIsStaff: setIsStaffAction,
} = dataSlice.actions


export default dataSlice.reducer