import { PureComponent } from 'React';
import Text from './text';
import TextArea from './textarea';
import Checkbox from './checkbox';
import Select from './select';

class FormControl extends PureComponent {
  render() {
    return (
      <section>
        <Text />
        <TextArea />
        <Checkbox />
        <Select />
      </section>
    )
  }
}
