
import {HTTP} from '@/assets/scripts/http-common.js';

const translate = {}
function openTranslate(){
	HTTP.get('translation/')
	.then(response =>{		
	var tr = response.data.csvData
	console.log(tr)
	tr[0][0] = tr[0][0].replace('\ufeff', '')
	for(var item in tr[0]){
	translate[tr[0][item]] = {
		message: {
			hello: tr[1][item],
			login: tr[2][item],
			followTraining: tr[3][item],
			showTraining: tr[4][item],
			showProgress: tr[72][item],
			examsReady: tr[73][item],
		},
		words:{
			login: tr[6][item],
			username: tr[7][item],
			password: tr[8][item],
			my: tr[9][item]
		},
		admin:{
			words: {
				users: tr[12][item],
				overview: tr[13][item],
				add: tr[14][item],
				open: tr[15][item],
				edit: tr[16][item],
				naam: tr[17][item],
				bedrijf: tr[18][item],
				telefoon: tr[19][item],
				accountrechten: tr[20][item],
				exam: tr[21][item],
				training: tr[22][item]
			},
			userEdit:{
				name: tr[17][item],
				surname: tr[23][item],
				residence: tr[24][item],
				country: tr[25][item],
				functie: tr[26][item],
				company: tr[18][item],
				city: tr[27][item],
				email: tr[28][item],
				workphone: tr[29][item],
				privephone: tr[30][item],
				language: tr[31][item],
				rights: tr[32][item],
				contactinfo: tr[33][item],
				personalinfo: tr[34][item],
				workinfo: tr[35][item],
				savechanges: tr[36][item],
				close: tr[38][item],
				blocked: tr[39][item],
				preference: tr[37][item]
			}
		},
		header:{
			home: tr[40][item],
			welcome: tr[41][item],
			profile: tr[42][item],
			settings: tr[43][item],
			training: tr[44][item],
			progress: tr[45][item],
			exams: tr[46][item],
			message: tr[47][item],
			admin: tr[48][item],
			help: tr[49][item],
			quit: tr[50][item]
		},
		trainingblock:{
			training: tr[44][item],
			program: tr[68][item],
			subject: tr[74][item],
			section: tr[75][item],
			continue: tr[76][item],
		},
		training:{
			quit: tr[50][item],
			help: tr[49][item],
			training: tr[51][item],
			questions: tr[52][item],
			next: tr[53][item],
			previous: tr[54][item],
			complete: tr[55][item],
			results: tr[56][item],
			summary: tr[57][item],
			score: tr[58][item],
			mark: tr[59][item],
			outcome: tr[60][item],
			amount: tr[61][item],
			questions1: tr[62][item],
			correct: tr[63][item],
			partcorrect: tr[64][item],
			wrong: tr[65][item],
			notanswered: tr[66][item],
			save: tr[67][item],
			antwoorden: tr[69][item],
			controleren: tr[70][item],
			correctanswer: tr[71][item]
			
		},
		messages:{
			messages: '',
			sender: '',
			subject: '',
			delivered: '',
			selectMessages: '',
			date: '',
			message: ''
		}
	}	
	}
	console.log(translate)
	})
}
export {translate, openTranslate}