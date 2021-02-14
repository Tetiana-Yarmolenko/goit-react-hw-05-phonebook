import s from "./Filter.module.css"

const Filter = ({ filter, onChange }) => {
    return (
         <label className={s.filter}>
        Find contacts by name
        <input
        className={s.input}
        type='text'
        value={filter}
        onChange={({target}) => onChange(target.value)}
        placeholder='Enter name for Search'/>
        </label>)
}
export default Filter