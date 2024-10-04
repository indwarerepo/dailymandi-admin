import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export interface Options {
    readonly value: string;
    readonly label: string;
}

type props = {
    name?: string;
    options: Options[];
    onChange: any;
    selectedvalue: string[] | any[];
};

export default function AnimatedMulti({ options, onChange, name, selectedvalue }: props) {
    const handleChange = (newValue: MultiValue<any>) => {
        const _selected = newValue.map((value) => value.value);

        onChange({ target: { name, value: _selected } });
    };

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            className="z-[1010] outline-none placeholder:text-sm"
            onChange={handleChange}
            defaultValue={options?.filter((option) => selectedvalue.includes(option.value))}
        />
    );
}
