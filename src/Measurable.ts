export interface Measurable<T> {
  readonly tags: string[] | Record<string, string>;
  readonly statName: string;

  execute(): Promise<T>;
}