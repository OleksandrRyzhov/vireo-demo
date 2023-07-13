import { Component, OnInit } from '@angular/core';
import * as intlTelInput from 'intl-tel-input';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        const inputElement = document.getElementById('phone');
        if (inputElement) {
            intlTelInput(inputElement, {
                initialCountry: 'auto',
                separateDialCode: true,
                geoIpLookup: (callback) => {
                    fetch('https://ipapi.co/json')
                        .then((res) => res.json())
                        .then((data) => callback(data.country_code))
                        .catch(() => callback('us'));
                },

                utilsScript:
                    'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
            });
        }
    }
    title = 'Vireo';
}
