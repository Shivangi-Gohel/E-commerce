import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { TabsContent } from '../ui/tabs'
import { useGetUsers } from '@/api/userApi'
import { Button } from '../ui/button'

const User = () => {
  const [page, setPage] = useState(1);
  const {data, isLoading, isError} = useGetUsers(page);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <TabsContent value="users">
        <Card>
          <CardContent className="grid gap-6">
            <Table>
              <TableHeader className="text-[16px]">
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Phone no.</TableHead>
              </TableHeader>
              <TableRow></TableRow>
              <TableBody>
                {data?.users?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="text-sm">#{user._id.slice(-6)}</TableCell>
                    <TableCell className="text-sm">{user.name}</TableCell>
                    <TableCell className="text-sm">{user.email}</TableCell>
                    <TableCell className="text-sm">{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                    <TableCell className="text-sm">{user.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <div className="flex gap-3 m-2 justify-end">
            <Button className="bg-amber-950 hover:bg-amber-800" disabled={page === 1} onClick={() => setPage(page - 1)}>
              prev
            </Button>
            <Button
              className="bg-amber-950 hover:bg-amber-800"
              disabled={data.users.length < 10}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </Card>
      </TabsContent>
    </div>
  )
}

export default User
