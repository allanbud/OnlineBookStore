import * as _ from "lodash";
import {Pipe, PipeTransform} from '@angular/core';

// https://lodash.com/docs/4.17.15

@Pipe({
	name:"dataFilter"
})
//searh-filter by product description
export class DataFilterPipe implements PipeTransform {
	transform(array: any[], query: string) : any {
		if(query) {
			return _.filter(array, row=> row.description.indexOf(query) > -1);
		}
		return array;
	}
}
