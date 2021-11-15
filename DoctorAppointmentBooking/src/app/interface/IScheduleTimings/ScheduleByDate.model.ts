import {ScheduleTimingModel} from "./ScheduleTiming.model";

export  interface ScheduleByDateModel{
      Sun:ScheduleTimingModel[],
      Monday : ScheduleTimingModel[],
      Thuesday :ScheduleTimingModel[],
      Wenday :ScheduleTimingModel[],
      Thursday :ScheduleTimingModel[],
      Friday :ScheduleTimingModel[],
      Sat :ScheduleTimingModel[]
}
