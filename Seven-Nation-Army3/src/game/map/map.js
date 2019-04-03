import React, { Component, Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, Container, Row, Col, CardBody, Jumbotron } from 'reactstrap';

import mapOverlay from "../../media/images/map_overlays.svg";
import mapLabels from "../../media/images/map_labels.svg";
import mapImage from "../../media/images/standard_colored.png";
import "../../styles/Map.scss";

// Holdover from first Seven-Nation-Army --Chris
// import Popup from '../../chat/components/Popup';
import ChatContainer from '../../chat/components/ChatContainer';
import BackButton from './BackButton';

export default class Map extends Component {

	constructor(props) {
		super(props);
		this.starting = [
				  [["Vienna", 0], ["Budapest", 0], ["Trieste", 1]],
				  [["Edinburgh", 1], ["Liverpool", 0], ["London", 1]],
				  [["Brest", 1], ["Paris", 0], ["Marseilles", 0]],
				  [["Kiel", 1], ["Berlin", 0], ["Munich", 0]],
				  [["Venice", 0], ["Rome", 0], ["Naples", 1]],
				  [["St_Petersburg", 1], ["Moscow", 0], ["Warsaw", 0], ["Sevastopol", 1]],
				  [["Constantinople", 0], ["Ankara", 1], ["Smyrna", 0]]
				 ];
		this.init = this.init.bind(this);
	}

	init(){
		const countries = ["Austria_Hungary", "England", "France", "Germany", "Italy", "Russia", "Turkey"];
		const colors = ["#ed497d", "#605aa7", "#9a9148", "#c0495e", "#cb75db", "#c95df6", "#7b69b8"];
		// 2D array
		// const starting = [
		// 				  [["Vienna", 0], ["Budapest", 0], ["Trieste", 1]],
		// 				  [["Edinburgh", 1], ["Liverpool", 0], ["London", 1]],
		// 				  [["Brest", 1], ["Paris", 0], ["Marseilles", 0]],
		// 				  [["Kiel", 1], ["Berlin", 0], ["Munich", 0]],
		// 				  [["Venice", 0], ["Rome", 0], ["Naples", 1]],
		// 				  [["St_Petersburg", 1], ["Moscow", 0], ["Warsaw", 0], ["Sevastopol", 1]],
		// 				  [["Constantinople", 0], ["Ankara", 1], ["Smyrna", 0]]
		// 				 ];
		const highlight_layer = document.getElementById('map_overlay');
		if(highlight_layer){
			const svgDoc = highlight_layer.contentDocument;
			for (let i = 0; i < this.starting.length; i++){
				for (let j = 0; j < this.starting[i].length; j++){
					const value = svgDoc.getElementById(this.starting[i][j][0]);
					if(value){
						value.setAttribute('stroke', colors[i]);
						value.setAttribute('stroke-width', 8);
						value.setAttribute('stroke-opacity', .5);
					}
				}
			}
		}
		this.highlight();
	}

	highlight() {
		const countries = ["Austria_Hungary", "England", "France", "Germany", "Italy", "Russia", "Turkey"];
		const colors = ["#ed497d", "#605aa7", "#9a9148", "#c0495e", "#cb75db", "#c95df6", "#7b69b8"];

		// Array of all the territory names, used as reference
		const names = [
			'Switzerland',
			'Adriatic_Sea',
			'Aegean_Sea',
			'Albania',
			'Ankara',
			'Apulia',
			'Armenia',
			'Baltic_Sea',
			'Barents_Sea',
			'Belgium',
			'Berlin',
			'Black_Sea',
			'Bohemia',
			'Brest',
			'Budapest',
			'Bulgaria',
			'Burgundy',
			'Clyde',
			'Constantinople',
			'Denmark',
			'Eastern_Mediterranean',
			'Edinburgh',
			'English_Channel',
			'Finland',
			'Galicia',
			'Gascony',
			'Greece',
			'Gulf_of_Lyon',
			'Gulf_of_Bothnia',
			'Helgoland_Bight',
			'Holland',
			'Ionian_Sea',
			'Irish_Sea',
			'Kiel',
			'Liverpool',
			'Livonia',
			'London',
			'Marseilles',
			'Mid-Atlantic_Ocean',
			'Moscow',
			'Munich',
			'Naples',
			'North_Atlantic_Ocean',
			'North_Africa',
			'North_Sea',
			'Norway',
			'Norwegian_Sea',
			'Paris',
			'Picardy',
			'Piedmont',
			'Portugal',
			'Prussia',
			'Rome',
			'Ruhr',
			'Rumania',
			'Serbia',
			'Sevastopol',
			'Silesia',
			'Skagerrak',
			'Smyrna',
			'Spain',
			'St_Petersburg',
			'Sweden',
			'Syria',
			'Trieste',
			'Tunis',
			'Tuscany',
			'Tyrolia',
			'Tyrrhenian_Sea',
			'Ukraine',
			'Venice',
			'Vienna',
			'Wales',
			'Warsaw',
			'Western_Mediterranean',
			'Yorkshire'
		];

		const highlight_layer = document.getElementById('map_overlay');
		let territories = [];

		// Opens the map_overlay svg document and iterates over all paths within it
		// Each path will be stored in the territories array
		// Then the we iterate over the territories array and attach an EventListener to each item in the array
		// These eventListeners will look for mouseover and mouseout events and modify the path accordingly
		// Currently it is set to change the color and opacity on enter and exit
		if (highlight_layer) {

			const svgDoc = highlight_layer.contentDocument;
			for (let i = 0; i < 76; i++) {
				const value = svgDoc.getElementById(names[i]);
				if (value) {
					value.style.fill = "yellow";
					value.addEventListener(
						'mouseenter',
						() => {
							value.setAttribute("fill-opacity", 0.33);
							const territoryOwner = typeof(countries[colors.indexOf(value.getAttribute('stroke'))]) != 'undefined' ? countries[colors.indexOf(value.getAttribute('stroke'))] : 'Unoccupied';
							document.getElementById('myPopup').classList.toggle('show');
							const arr = this.starting[countries.indexOf(countries[colors.indexOf(value.getAttribute('stroke'))])];
							let unit = "None";
							if(typeof arr != "undefined"){
								for(let i = 0; i < arr.length; i++){
									if(value.id == arr[i][0]){
										unit = arr[i][1] == 0 ? "Army" : "Fleet";
										break;
									}
								}
							}
	
							document.getElementById("popupText").innerHTML = "Country: " + territoryOwner + 
																			"<br/> Territory: " + value.id + 
																			"<br/> Unit: " + unit + 
																			"<br/>" + "Player:  None";
						}, false);
					value.addEventListener(
						'mouseout',
						() => {
							value.setAttribute("fill-opacity", 0);
							if (document.getElementsByClassName('show').length != 0){
								document.getElementById('myPopup').classList.toggle('show');
							}
						}, false);
					value.addEventListener(
						'click',
						() => {
							console.log("CLICK");
						}, false);
				}

			}
		}
	}

	render() {
		return (
			// The displayArea class will keep everything centered on the screen and resize it with the window
			<Fragment>
				<BackButton />
				<ChatContainer />
				<div className="displayArea">
					<img
						className='resize_fit_center'
						src={mapImage}
						id="map_image"
					/>

					<object
						className="resize_fit_center"
						data={mapOverlay}
						type="image/svg+xml"
						id="map_overlay"
						onLoad={this.init}
					/>

					<div className="popup" id="popupContainer">
						<span className="popuptext" id="myPopup">
							<p id="popupText"></p>
						</span>
					</div>

				</div>
			</Fragment>
		);
	}
}
