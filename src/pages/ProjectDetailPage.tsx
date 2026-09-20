import { useParams, Link } from 'react-router-dom'
import { useProject, useUpdateProject } from '@/hooks/useProjects'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import type { ProjectStatus } from '@/types/database'
import { toast } from 'sonner'

const statusColor: Record<string, string> = {
  '洽談中': 'bg-yellow-100 text-yellow-800',
  '進行中': 'bg-blue-100 text-blue-800',
  '完工': 'bg-green-100 text-green-800',
  '結案': 'bg-gray-100 text-gray-800',
  '取消': 'bg-red-100 text-red-800',
}

const allStatuses: ProjectStatus[] = ['洽談中', '進行中', '完工', '結案', '取消']

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading } = useProject(id)
  const updateProject = useUpdateProject()

  async function handleStatusChange(status: ProjectStatus) {
    if (!id) return
    try {
      await updateProject.mutateAsync({ id, status })
      toast.success('狀態已更新')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : '更新失敗')
    }
  }

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">載入中...</div>
  if (!project) return <div className="p-8 text-center text-muted-foreground">找不到案件</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/projects"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <Badge className={statusColor[project.status] ?? ''} variant="secondary">{project.status}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">基本資料</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">客戶</span><span>{(project.client as { name: string } | null)?.name ?? '—'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">地址</span><span>{project.address ?? '—'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">預算</span><span>{project.budget != null ? `$${project.budget.toLocaleString()}` : '—'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">開始日期</span><span>{project.start_date ?? '—'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">結束日期</span><span>{project.end_date ?? '—'}</span></div>
            {project.notes && (
              <div><span className="text-muted-foreground">備註</span><p className="mt-1">{project.notes}</p></div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">狀態變更</CardTitle></CardHeader>
          <CardContent>
            <Select
              value={project.status}
              onChange={e => handleStatusChange(e.target.value as ProjectStatus)}
            >
              {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
