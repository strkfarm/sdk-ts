import BigNumber from "bignumber.js";

export class _Web3Number<T extends _Web3Number<T>> extends BigNumber {
    decimals: number;

    constructor(value: string | number, decimals: number) {
        super(value);
        this.decimals = decimals;
    }

    toWei() {
        return this.mul(10 ** this.decimals).toFixed(0);
    }

    multipliedBy(value: string | number | T): T {
        let _value = Number(value).toFixed(13);
        return this.construct(this.mul(_value).toString(), this.decimals);
    }

    dividedBy(value: string | number | T): T {
        let _value = Number(value).toFixed(13);
        return this.construct(this.div(_value).toString(), this.decimals);
    }

    plus(value: string | number | T): T {
        const _value = Number(value).toFixed(13);
        return this.construct(this.add(_value).toString(), this.decimals);
    }

    minus(n: number | string | T, base?: number): T {
        const _value = Number(n).toFixed(13);
        return this.construct(super.minus(_value, base).toString(), this.decimals);
    }

    protected construct(value: string | number, decimals: number): T {
        return new (this.constructor as { new (value: string | number, decimals: number): T })(value, decimals);
    }

    toString(base?: number | undefined): string {
        return super.toString(base);
    }
    
    toJSON() {
        return this.toString();
    }

    valueOf() {
        return this.toString();
    }
}

BigNumber.config({ DECIMAL_PLACES: 18 })
_Web3Number.config({ DECIMAL_PLACES: 18 })
