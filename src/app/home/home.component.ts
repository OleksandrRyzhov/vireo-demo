import { Component, OnInit } from '@angular/core';
import * as intlTelInput from 'intl-tel-input';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        const inputElement = document.getElementById(
            'phone'
        ) as HTMLInputElement | null;
        if (inputElement) {
            const reset = () => {
                inputElement.classList.remove('error');
            };
            const iti = intlTelInput(inputElement, {
                initialCountry: 'auto',
                separateDialCode: true,
                // hiddenInput: 'full_number',
                geoIpLookup: (callback) => {
                    fetch('https://ipapi.co/json')
                        .then((res) => res.json())
                        .then((data) => callback(data.country_code))
                        .catch(() => callback('us'));
                },
                utilsScript:
                    'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
            });
            inputElement.addEventListener('input', function () {
                if (inputElement.value.match(/[^0-9+]/g)) {
                    inputElement.value = inputElement.value.replace(
                        /[^0-9+]/g,
                        ''
                    );
                }
            });
            inputElement.addEventListener('blur', () => {
                reset();
                if (inputElement.value.trim()) {
                    if (iti.isValidNumber()) {
                    } else {
                        inputElement.classList.add('error');
                    }
                }
            });
            inputElement.addEventListener('change', reset);
            inputElement.addEventListener('keyup', reset);
        }
    }
}
