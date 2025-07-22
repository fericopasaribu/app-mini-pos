export const formatNumber = (text: number) => {
    return text.toLocaleString("id-ID")
}

export const formatFixedDecimal = (text: number) => {
    return text.toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}

export const formatNumberAutoFraction = (text: number) => {
    const hasFraction = text % 1 !== 0;

    return text.toLocaleString("id-ID", {
        minimumFractionDigits: hasFraction ? 2 : 0,
        maximumFractionDigits: hasFraction ? 2 : 0,
    })
}

export const formatThousand = (value: string): string => {
    const numeric = value.replace(/[^0-9]/g, '').replace(/^0+/, '');
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // tambah titik tiap 3 angka
};


export const filterForNumber = (value: string): string => {
    return value.replace(/[^0-9]/g, '');
};

export const filterForText = (value: string): string => {
    return value.replace(/[^a-zA-Z ]/g, '');
};

export const filterForNumberText = (value: string): string => {
    return value.replace(/[^0-9a-zA-Z -.,]/g, '');
};

export const filterForNumberTextPlus = (value: string): string => {
    return value.replace(/[^0-9a-zA-Z '"-.,]/g, '');
};

export const filterForCode = (value: string): string => {
    return value.replace(/[^0-9a-zA-Z-.]/g, '');
};

export const filterForName = (value: string): string => {
    return value.replace(/[^a-zA-Z .,]/g, '').replace(/^0+/, '');
};

export const filterForEmail = (value: string): string => {
    return value.replace(/[^a-zA-Z.@]/g, '').replace(/^0+/, '');
};

