import React, { useEffect, useRef, useState } from 'react';
import './CreditCard.css?inline'
import { Link } from 'react-router-dom'
import credit_chip from "../../assets/icons/nam_creadit_chip.svg"

const FormCreditCard = () => {
    const creditCardRef = useRef();
    const [cardNumberText, setCardNumberText] = useState('');
    const [cardName, setCardName] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');

    useEffect(() => {
        if (!creditCardRef.current) return;

        const input = creditCardRef.current;

        const format_and_pos = (char, backspace) => {
            let start = 0, end = 0, pos = 0;
            const separator = ' ';
            let value = input.value;

            if (char !== false) {
                start = input.selectionStart;
                end = input.selectionEnd;

                if (backspace && start > 0) {
                    start--;
                    if (value[start] === separator) start--;
                }

                value = value.substring(0, start) + char + value.substring(end);
                pos = start + char.length;
            }

            let d = 0, dd = 0, gi = 0;
            let newV = '';
            const groups = /^\D*3[47]/.test(value) ? [4, 6, 5] : [4, 4, 4, 4];

            for (let i = 0; i < value.length; i++) {
                if (/\D/.test(value[i])) {
                    if (start > i) pos--;
                } else {
                    if (d === groups[gi]) {
                        newV += separator;
                        d = 0; gi++;
                        if (start >= i) pos++;
                    }
                    newV += value[i];
                    d++; dd++;
                }
                if (d === groups[gi] && groups.length === gi + 1) break;
            }

            input.value = newV;
            setCardNumberText(newV);
            if (char !== false) input.setSelectionRange(pos, pos);
        };

        const onKeypress = (e) => {
            const code = e.charCode || e.keyCode || e.which;
            if (code !== 9 && (code < 37 || code > 40) && !(e.ctrlKey && (code === 99 || code === 118))) {
                e.preventDefault();
                const char = String.fromCharCode(code);
                const digits = input.value.replace(/\D/g, '');
                const isAmex = /^\D*3[47]/.test(input.value);
                const maxLen = isAmex ? 15 : 16;

                if (/\D/.test(char) || (input.selectionStart === input.selectionEnd && digits.length >= maxLen)) return false;
                format_and_pos(char);
            }
        };

        const onKeydown = (e) => {
            if (e.keyCode === 8 || e.keyCode === 46) {
                e.preventDefault();
                format_and_pos('', input.selectionStart === input.selectionEnd);
            }
        };

        const onPaste = () => setTimeout(() => format_and_pos(''), 50);

        const onBlur = () => format_and_pos(input, false);

        input.addEventListener('keypress', onKeypress);
        input.addEventListener('keydown', onKeydown);
        input.addEventListener('paste', onPaste);
        input.addEventListener('blur', onBlur);

        return () => {
            input.removeEventListener('keypress', onKeypress);
            input.removeEventListener('keydown', onKeydown);
            input.removeEventListener('paste', onPaste);
            input.removeEventListener('blur', onBlur);
        };
    }, []);

    return (
        <div className="FormCreditCard pt-36 pb-16">
            <div className="site-credit" id='page-credit'>
                <div className='container-credit'>
                    <div className='outer-credit'>
                        <div className='header-credit'>
                            <div className='logo-credit'>
                                <Link to=""><strong>Family</strong>Farm</Link>
                            </div>
                            <div className='title-credit'>Card Settings</div>
                        </div>
                        <section className='payment-credit'>
                            <div className='left-credit'>
                                <form>

                                    <div className='card-number'>
                                        <p>Card Number</p>
                                        <span>Enter the 16-digit card number on the card</span>
                                        <div className='card-number-box'>
                                            <input type='text' id='credit-card' autoComplete='off' placeholder='xxxx - xxxx - xxxx - xxxx' ref={creditCardRef} />
                                            <span className='cc-logo'></span>
                                        </div>
                                    </div>

                                    <div className='card-holder'>
                                        <div className='text'>
                                            <p>Card Name holder</p>
                                            <span>Enter name card holder on the card</span>
                                        </div>
                                        <div className='input-credit'>
                                            <input type='text' id='card-name' autoComplete='off' required onChange={(e) => setCardName(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className='card-expiration'>
                                        <div className='text'>
                                            <p>Expiry Date</p>
                                            <span>Enter the expiration date of the card</span>
                                        </div>
                                        <div className='input-credit'>
                                            <input type='number' id='exp-month' placeholder='MM' data-maxlength="2" required onChange={(e) => setExpMonth(e.target.value.slice(0, 2))} />
                                            <strong> / </strong>
                                            <input type='number' id='exp-year' placeholder='YY' data-maxlength="2" required onChange={(e) => setExpYear(e.target.value.slice(0, 2))} />
                                        </div>
                                    </div>

                                    <button>Save Card</button>
                                </form>
                            </div>

                            <div className='right-credit'>
                                <div className='card-virtual'>
                                    <p className='cc-logo'></p>
                                    <p className='name-holder'>{cardName || 'Name of user'}</p>
                                    <p className='chip'>
                                        <img src={credit_chip} alt='' />
                                    </p>
                                    <p className='highlight'>
                                        <span className='last-digit' id='card-number'>
                                            {cardNumberText || '.... .... .... 4567'}
                                        </span>
                                        <span className='expiry'>
                                            <span className='exp-month'>{expMonth || 'MM'}</span> /
                                            <span className='exp-year'> {expYear || 'YY'}</span>
                                        </span>
                                    </p>
                                </div>

                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormCreditCard