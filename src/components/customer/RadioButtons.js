import React, { Component } from 'react'

import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
export default function RadioButtons() {

    
    
        return (
            <form>
                <RadioGroup horizontal>
                    <ReversedRadioButton pointColor="purple" value="apple">
                        Apple
                    </ReversedRadioButton>
                    <ReversedRadioButton pointColor="purple" value="orange">
                        Orange
                    </ReversedRadioButton>
                    <ReversedRadioButton pointColor="purple" value="melon">
                        Melon
                    </ReversedRadioButton>
                    <ReversedRadioButton pointColor="purple" value="melon">
                        Melon
                    </ReversedRadioButton>
                </RadioGroup>
            </form>
        )
    
}
