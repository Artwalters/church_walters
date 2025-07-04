import { Perf } from 'r3f-perf'

export default function PerformanceMonitor() {
    return (
        <Perf 
            position="top-left"
            showGraph={false}
            minimal={false}
        />
    )
}