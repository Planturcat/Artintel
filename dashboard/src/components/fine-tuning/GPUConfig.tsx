import { useState } from 'react';
import { GPUConfig as GPUConfigType } from '@/types/fine-tuning';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

interface GPUConfigProps {
  initialValues?: Partial<GPUConfigType>;
  onChange: (values: GPUConfigType) => void;
  availableGPUs?: Array<{
    type: string;
    count: number;
    memoryPerGpu: number;
  }>;
}

const defaultValues: GPUConfigType = {
  count: 1,
  type: 'NVIDIA A100',
  memoryPerGpu: 40,
};

export default function GPUConfig({
  initialValues = {},
  onChange,
  availableGPUs = [
    { type: 'NVIDIA A100', count: 8, memoryPerGpu: 40 },
    { type: 'NVIDIA V100', count: 8, memoryPerGpu: 32 },
    { type: 'NVIDIA T4', count: 4, memoryPerGpu: 16 },
  ],
}: GPUConfigProps) {
  const [values, setValues] = useState<GPUConfigType>({
    ...defaultValues,
    ...initialValues,
  });

  const handleChange = (field: keyof GPUConfigType, value: string | number) => {
    const newValues = {
      ...values,
      [field]: field === 'count' ? Number(value) : value,
      memoryPerGpu: field === 'type'
        ? availableGPUs.find((gpu) => gpu.type === value)?.memoryPerGpu || values.memoryPerGpu
        : values.memoryPerGpu,
    };
    setValues(newValues);
    onChange(newValues);
  };

  const selectedGPU = availableGPUs.find((gpu) => gpu.type === values.type);
  const maxGPUs = selectedGPU?.count || 1;

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-semibold">GPU Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">GPU Type</label>
          <Select
            value={values.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            {availableGPUs.map((gpu) => (
              <option key={gpu.type} value={gpu.type}>
                {gpu.type} ({gpu.memoryPerGpu}GB)
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Number of GPUs</label>
          <Input
            type="number"
            value={values.count}
            onChange={(e) => handleChange('count', e.target.value)}
            min="1"
            max={maxGPUs}
          />
          <p className="text-sm text-gray-500 mt-1">
            Maximum available: {maxGPUs}
          </p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          Total GPU Memory: {values.count * values.memoryPerGpu}GB
        </p>
      </div>
    </Card>
  );
} 