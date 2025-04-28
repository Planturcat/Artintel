import { useState } from 'react';
import { HyperParameters } from '@/types/fine-tuning';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

interface HyperParameterConfigProps {
  initialValues?: Partial<HyperParameters>;
  onChange: (values: HyperParameters) => void;
}

const defaultValues: HyperParameters = {
  learningRate: 0.0001,
  batchSize: 32,
  epochs: 10,
  warmupSteps: 100,
  weightDecay: 0.01,
  optimizerType: 'adamw',
  schedulerType: 'linear',
};

export default function HyperParameterConfig({
  initialValues = {},
  onChange,
}: HyperParameterConfigProps) {
  const [values, setValues] = useState<HyperParameters>({
    ...defaultValues,
    ...initialValues,
  });

  const handleChange = (field: keyof HyperParameters, value: string | number) => {
    const newValues = {
      ...values,
      [field]: typeof defaultValues[field] === 'number' ? Number(value) : value,
    };
    setValues(newValues);
    onChange(newValues);
  };

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-semibold">Hyperparameters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Learning Rate</label>
          <Input
            type="number"
            value={values.learningRate}
            onChange={(e) => handleChange('learningRate', e.target.value)}
            step="0.0001"
            min="0.00001"
            max="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Batch Size</label>
          <Input
            type="number"
            value={values.batchSize}
            onChange={(e) => handleChange('batchSize', e.target.value)}
            min="1"
            max="512"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Epochs</label>
          <Input
            type="number"
            value={values.epochs}
            onChange={(e) => handleChange('epochs', e.target.value)}
            min="1"
            max="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Warmup Steps</label>
          <Input
            type="number"
            value={values.warmupSteps}
            onChange={(e) => handleChange('warmupSteps', e.target.value)}
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Weight Decay</label>
          <Input
            type="number"
            value={values.weightDecay}
            onChange={(e) => handleChange('weightDecay', e.target.value)}
            step="0.001"
            min="0"
            max="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Optimizer</label>
          <Select
            value={values.optimizerType}
            onChange={(e) => handleChange('optimizerType', e.target.value)}
          >
            <option value="adamw">AdamW</option>
            <option value="adam">Adam</option>
            <option value="sgd">SGD</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Learning Rate Schedule</label>
          <Select
            value={values.schedulerType}
            onChange={(e) => handleChange('schedulerType', e.target.value)}
          >
            <option value="linear">Linear</option>
            <option value="cosine">Cosine</option>
            <option value="constant">Constant</option>
          </Select>
        </div>
      </div>
    </Card>
  );
} 